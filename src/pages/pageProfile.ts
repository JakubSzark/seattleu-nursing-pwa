import { App, Page } from "../index";
import $ from "jquery";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { Database } from "../database";

export default class ProfilePage extends Page {
    page = "profile";
    fullscreen = true;

    loaded() {
        if (App.user === undefined) {
            App.page.value = "home";
            return;
        }

        if (App.user.email !== null) {
            $("#profile-email").html(
                App.isAdmin ? `${App.user.email} (Admin)` : App.user.email
            );
        }

        const $appointments = $("#appointments");
        const $upcoming = $(".upcoming");

        Database.getUserAppointments(App.user?.uid)
            .then((appointments) => {
                if (appointments.length > 0) {
                    $(".cancel-button").show();
                    $upcoming.fadeIn("fast");
                } else {
                    $upcoming.fadeOut("fast");
                }

                appointments.forEach((appt) => {
                    const date = new Date(appt.year, appt.month, appt.date);

                    $appointments.append(`
                    <div class="appointment center">
                        <h3>Date & Time</h3>
                        <p>${date.toLocaleDateString("en")} - ${appt.time}</p>
                        <h3>Vehicle</h3>
                        <p>${appt.carYear} ${appt.type} ${appt.model}</p>
                        <h3>Issue</h3>
                        <p>${appt.problem}</p>
                    </div>
                `);
                });

                $appointments.slideDown("fast");

                $(".cancel-button").on("click", () => {
                    const collection = firebase
                        .firestore()
                        .collection("appointments");

                    collection
                        .where("user", "==", App.user?.uid)
                        .get()
                        .then((snapshot) => {
                            snapshot.docs.forEach((doc) => {
                                collection.doc(doc.id).delete();
                            });

                            App.page.value = "profile";
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });

                $("#content").on("click", "#sign-out", () => {
                    firebase.auth().signOut();
                    localStorage.removeItem("user");
                    window.location.reload();
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
