import { App, Page } from "..";
import $ from "jquery";

import { Appointment, Database } from "../database";

export default class BookingPage extends Page {
    page = "booking";

    selectedDate?: Date;
    selectedTime?: string;

    creatingAppointment = false;
    fullscreen = true;

    carTypes?: Array<string>;
    problems?: Array<string>;

    created() {
        super.created();

        fetch("./booking.json")
            .then((response) => response.json())
            .then((json) => {
                this.carTypes = json["carTypes"];
                this.problems = json["problems"];
            })
            .catch((error) => {
                console.log(error);
            });
    }

    loaded() {
        if (App.user) {
            $("#login-requirement").hide();
            $(".booking-page").show();
        }

        this.setupDateButtons();

        $(".login-btn").on("click", () => {
            App.page.value = "login";
        });

        this.carTypes?.forEach((carType, index) => {
            const option = document.createElement("option");
            option.selected = index === 0;
            option.value = carType;
            option.innerText = carType;
            $("#carType").append(option);
        });

        this.problems?.forEach((problem, index) => {
            const option = document.createElement("option");
            option.selected = index === 0;
            option.value = problem;
            option.innerText = problem;
            $("#problems").append(option);
        });

        const bookingPage = this;
        $(document)
            .off("submit")
            .on("submit", ".appointment-form", function (ev) {
                bookingPage.submitAppointment();
                ev.preventDefault();
                return false;
            });

        this.lastPage = "home";
        this.selectedDate = this.getNextWeek();
        this.loadAppointments();
    }

    /**
     * Returns the beggining date of next week.
     */
    private getNextWeek() {
        const now = new Date();
        return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 7 - now.getDay() + 1
        );
    }

    /**
     * Sets the dates and events on the day buttons.
     */
    private setupDateButtons() {
        const bookingPage = this;
        const $dateButtons = $("#day-buttons button");
        const nextWeek = this.getNextWeek();

        const date = nextWeek.getDate();
        const month = nextWeek.getMonth() + 1;

        const monthName = nextWeek.toLocaleDateString("default", {
            month: "long",
        });

        $("#month").html(
            `${monthName} (${month}/${date} - ${month}/${date + 4})`
        );

        $(".date").each(function (index) {
            this.innerText = `${month}/${date + index}`;
        });

        $dateButtons.each(function (index) {
            this.addEventListener("click", () => {
                bookingPage.selectedDate = new Date(
                    nextWeek.getFullYear(),
                    nextWeek.getMonth(),
                    nextWeek.getDate() + index
                );

                bookingPage.loadAppointments();
                $dateButtons.each(function (buttonIndex) {
                    (<HTMLButtonElement>this).disabled = index === buttonIndex;
                });
            });
        });
    }

    /**
     * Sets up the timeslot buttons with info and events.
     * @param appointments Appointments gathered from Database
     */
    private setupTimeslotButtons(appointments: Array<Appointment>) {
        const bookingPage = this;
        const $timeslot = $(".timeslot");

        $timeslot.off("click").each(function () {
            const $span = $(this).children("span");
            const $info = $(this).children(".info");
            const $cancel = $(this).children("a");

            const appointment = appointments.find((a) => {
                return a.time == $span.text();
            });

            const isTaken = appointment !== undefined;
            const isOwner = isTaken && appointment?.user == App.user?.uid;

            $(this).toggle(!isTaken || App.isAdmin || isOwner);
            (<HTMLButtonElement>this).disabled = isTaken;

            $cancel.toggle(isTaken);
            $info.toggle(isTaken);

            if (appointment !== undefined && (App.isAdmin || isOwner)) {
                const {
                    user,
                    carYear,
                    email,
                    type,
                    model,
                    problem,
                } = appointment;

                // Give the Timeslot its Appointment Info
                $info.html(
                    `${carYear} | <u>${type} ${model}</u> | ${problem} | <i>${email}</i>`
                );

                $cancel.off("click").on("click", () => {
                    Database.deleteAppointments(user).then(() => {
                        setTimeout(() => {
                            App.page.value = "booking";
                            App.displayMessage("Appointment Canceled");
                        }, 500);
                    });
                });
            }

            // Make the Timeslot gold if you are the Owner
            if (isOwner) $(this).addClass("gold");
            else $(this).removeClass("gold");

            // If there is no Appointment on this Date
            if (appointment === undefined) {
                $(this).on("click", function () {
                    bookingPage.onTimeslotClicked(this.innerText);
                });
            }
        });

        $("#timeslots").slideDown("fast");
    }

    /**
     * Called when a timeslot was clicked
     * @param selectedTime The time that was selected
     */
    private onTimeslotClicked(selectedTime: string) {
        if (App.user === undefined) {
            App.displayMessage("You are not logged in!");
            return;
        }

        Database.userHasAppointment(App.user?.uid)
            .then((exists) => {
                if (exists) {
                    App.displayMessage("You already have an Appointment!");
                } else {
                    $(".booking-page").fadeOut("fast", () => {
                        $(".appointment-form").fadeIn("fast");
                        this.creatingAppointment = true;
                        this.lastPage = "booking";
                        this.selectedTime = selectedTime;
                        this.setupAppointmentForm();
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /** Sets the Time and Date of the Appointment Form */
    private setupAppointmentForm() {
        if (
            this.selectedDate === undefined ||
            this.selectedTime === undefined
        ) {
            throw "Appointment form not setup correctly!";
        }

        const dayName = this.selectedDate.toLocaleDateString("en", {
            weekday: "long",
        });

        $("#form-date").text(`${dayName} - ${this.selectedTime}`);
    }

    /** Retrieves Appointments from Database */
    loadAppointments() {
        $("#timeslots").slideUp("fast", () => {
            if (this.selectedDate !== undefined) {
                Database.getAppointmentsForDate(this.selectedDate)
                    .then((appts) => this.setupTimeslotButtons(appts))
                    .catch((error) => console.log(error));
            }
        });
    }

    /** Creates an Appointment on the Database */
    private submitAppointment() {
        if (App.user !== undefined && this.selectedDate !== undefined) {
            const carType = $("#carType").val() as string;
            const carModel = $("#carModel").val() as string;
            const problem = $("#problems").val() as string;
            const carYear = parseInt($("#carYear").val() as string);

            if (carYear < 1950 || carYear > new Date().getFullYear()) {
                App.displayMessage("Car year is out of date or too new!");
                return;
            }

            Database.addAppointment({
                user: App.user?.uid,
                email: App.user?.email!,
                year: this.selectedDate?.getFullYear(),
                month: this.selectedDate?.getMonth(),
                date: this.selectedDate?.getDate(),
                time: this.selectedTime!,
                type: carType,
                model: carModel,
                problem: problem,
                carYear: carYear,
            }).then((success) => {
                if (success) {
                    App.page.value = "booking";
                    App.displayMessage("Appointment Created");
                } else {
                    App.displayMessage("Failed to create Appointment");
                }
            });
        }
    }
}
