import firebase from "firebase/app";
import "firebase/firestore";
import { App } from ".";

/** Represents an Appointment in our Database */
export interface Appointment {
    user: string;
    email: string;

    year: number;
    month: number;
    date: number;

    time: string;

    type: string;
    carYear: number;
    problem: string;
    model: string;
}

/** Contains functions for working with Firebase */
export namespace Database {
    const APPOINTMENTS: string = "appointments";
    const ADMIN: string = "admin";

    /**
     * Returns an Array of Appointments from the Database on a Date
     * @param date The date to which we retrieve appointments
     */
    export function getAppointmentsForDate(
        date: Date
    ): Promise<Array<Appointment>> {
        return new Promise((resolve, reject) => {
            const collection = firebase.firestore().collection(APPOINTMENTS);
            const query = collection
                .where("year", "==", date.getFullYear())
                .where("month", "==", date.getMonth())
                .where("date", "==", date.getDate());

            query
                .get()
                .then((snapshot) => {
                    resolve(
                        snapshot.docs.map((doc) => doc.data() as Appointment)
                    );
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Checks whether the date on the appointment already exists
     * @param appointment The date of appointment to check by
     */
    export function doesAppointmentExist(
        appointment: Appointment
    ): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const collection = firebase.firestore().collection(APPOINTMENTS);
            const query = collection
                .where("year", "==", appointment.year)
                .where("month", "==", appointment.month)
                .where("date", "==", appointment.date)
                .where("time", "==", appointment.time);

            query
                .get()
                .then((snapshot) => {
                    resolve(!snapshot.empty);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Adds an Appointment to the Database
     * @param appointment The Appointment to add to the Database
     */
    export function addAppointment(appointment: Appointment): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const collection = firebase.firestore().collection(APPOINTMENTS);
            Database.doesAppointmentExist(appointment)
                .then((exists) => {
                    if (exists) {
                        App.displayMessage(
                            "There is already an appointment on this day!"
                        );

                        resolve(false);
                    } else {
                        collection
                            .doc()
                            .set(appointment)
                            .then(() => {
                                resolve(true);
                            });
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Removes Appointments with the User ID
     * @param uid The uid of the User's Appointment
     */
    export function deleteAppointments(uid: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const collection = firebase.firestore().collection(APPOINTMENTS);
            const query = collection.where("user", "==", uid);

            query
                .get()
                .then((snapshot) => {
                    snapshot.docs.forEach((doc) => {
                        collection.doc(doc.id).delete();
                    });

                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Gets an Array of Appointments from a User
     * @param uid The uid of the User
     */
    export function getUserAppointments(
        uid: string
    ): Promise<Array<Appointment>> {
        return new Promise((resolve, reject) => {
            const collection = firebase.firestore().collection(APPOINTMENTS);
            const query = collection.where("user", "==", uid);

            query
                .get()
                .then((snapshot) => {
                    resolve(
                        snapshot.docs.map((doc) => doc.data() as Appointment)
                    );
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * This checks to see if a User already has an Appointment
     * @param uid The uid of the User
     */
    export function userHasAppointment(uid: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const collection = firebase.firestore().collection(APPOINTMENTS);
            const query = collection.where("user", "==", uid);

            query
                .get()
                .then((snapshot) => {
                    resolve(!snapshot.empty);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Checks whether this User is registered as an Admin
     * @param uid The uid of the User
     */
    export function userIsAdmin(uid: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const collection = firebase.firestore().collection(ADMIN);
            collection
                .doc(uid)
                .get()
                .then((snapshot) => {
                    resolve(snapshot.exists);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
