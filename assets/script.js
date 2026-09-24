/* =====================================================
   ITSkillsAcademy Enquiry Form
   Frontend Controller
===================================================== */


/* =====================================================
   GOOGLE APPS SCRIPT WEB APP URL
=====================================================

   IMPORTANT:
   Replace the URL below with your deployed
   Google Apps Script /exec URL.

===================================================== */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyRkNKdCwCnsB5OS0M_ihFLY06dPcJW4AMZivroCPruaghc-OLJRgGR3jKxB-hO1GY/exec";


/* =====================================================
   DOM ELEMENTS
===================================================== */

const enquiryForm =
    document.getElementById("enquiryForm");

const submitButton =
    document.getElementById("submitButton");

const buttonText =
    document.getElementById("buttonText");

const loadingSpinner =
    document.getElementById("loadingSpinner");

const successScreen =
    document.getElementById("successScreen");

const successEnquiryId =
    document.getElementById("successEnquiryId");

const newEnquiryButton =
    document.getElementById("newEnquiryButton");

const enquiryMessage =
    document.getElementById("enquiryMessage");

const characterCounter =
    document.getElementById("characterCounter");


/* =====================================================
   CHARACTER COUNTER
===================================================== */

if (enquiryMessage) {

    enquiryMessage.addEventListener(
        "input",
        function () {

            const length =
                this.value.length;

            characterCounter.textContent =
                `${length} / 1000`;

        }
    );

}


/* =====================================================
   MOBILE INPUT
   Allow only numbers
===================================================== */

const mobileInput =
    document.getElementById("mobile");


if (mobileInput) {

    mobileInput.addEventListener(
        "input",
        function () {

            this.value =
                this.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

        }
    );

}


/* =====================================================
   FORM VALIDATION
===================================================== */

function validateForm() {

    let valid = true;


    clearErrors();


    /* -----------------------------------------------
       Student Name
    ------------------------------------------------ */

    const studentName =
        document
            .getElementById("studentName")
            .value
            .trim();


    if (!studentName) {

        showError(
            "studentName",
            "Please enter student name."
        );

        valid = false;

    }


    /* -----------------------------------------------
       Guardian Name
    ------------------------------------------------ */

    const guardianName =
        document
            .getElementById("guardianName")
            .value
            .trim();


    if (!guardianName) {

        showError(
            "guardianName",
            "Please enter guardian name."
        );

        valid = false;

    }


    /* -----------------------------------------------
       Guardian Type
    ------------------------------------------------ */

    const guardianType =
        document
            .getElementById("guardianType")
            .value;


    if (!guardianType) {

        showError(
            "guardianType",
            "Please select guardian type."
        );

        valid = false;

    }


    /* -----------------------------------------------
       Mobile
    ------------------------------------------------ */

    const mobile =
        document
            .getElementById("mobile")
            .value
            .trim();


    const mobilePattern =
        /^[6-9]\d{9}$/;


    if (!mobile) {

        showError(
            "mobile",
            "Please enter mobile number."
        );

        valid = false;

    }
    else if (
        !mobilePattern.test(mobile)
    ) {

        showError(
            "mobile",
            "Enter a valid 10-digit mobile number."
        );

        valid = false;

    }


    /* -----------------------------------------------
       Email
    ------------------------------------------------ */

    const email =
        document
            .getElementById("email")
            .value
            .trim();


    if (email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            showError(
                "email",
                "Please enter a valid email address."
            );

            valid = false;

        }

    }


    /* -----------------------------------------------
       Class
    ------------------------------------------------ */

    const classEnquiryFor =
        document
            .getElementById("classEnquiryFor")
            .value;


    if (!classEnquiryFor) {

        showError(
            "classEnquiryFor",
            "Please select the class."
        );

        valid = false;

    }


    /* -----------------------------------------------
       Training Type
    ------------------------------------------------ */

    const trainingType =
        document.querySelector(
            'input[name="trainingType"]:checked'
        );


    if (!trainingType) {

        document
            .getElementById("trainingTypeError")
            .textContent =
            "Please select a training type.";

        valid = false;

    }


    return valid;

}


/* =====================================================
   SHOW ERROR
===================================================== */

function showError(
    fieldId,
    message
) {

    const field =
        document.getElementById(fieldId);


    const error =
        document.getElementById(
            fieldId + "Error"
        );


    if (field) {

        field.classList.add(
            "input-error"
        );

    }


    if (error) {

        error.textContent =
            message;

    }

}


/* =====================================================
   CLEAR ERRORS
===================================================== */

function clearErrors() {

    document
        .querySelectorAll(
            ".input-error"
        )
        .forEach(
            element => {

                element.classList.remove(
                    "input-error"
                );

            }
        );


    document
        .querySelectorAll(
            ".error-message"
        )
        .forEach(
            element => {

                element.textContent = "";

            }
        );

}


/* =====================================================
   REMOVE ERROR WHEN USER STARTS CORRECTING
===================================================== */

document
    .querySelectorAll(
        "#enquiryForm input, #enquiryForm select, #enquiryForm textarea"
    )
    .forEach(
        element => {

            element.addEventListener(
                "input",
                function () {

                    this.classList.remove(
                        "input-error"
                    );

                }
            );


            element.addEventListener(
                "change",
                function () {

                    this.classList.remove(
                        "input-error"
                    );

                }
            );

        }
    );


/* =====================================================
   FORM SUBMISSION
===================================================== */

enquiryForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        /* ---------------------------------------------
           Validate
        ---------------------------------------------- */

        if (!validateForm()) {

            const firstError =
                document.querySelector(
                    ".input-error"
                );


            if (firstError) {

                firstError.focus();

            }


            return;

        }


        /* ---------------------------------------------
           Check API URL
        ---------------------------------------------- */

        if (
            !GOOGLE_SCRIPT_URL ||
            GOOGLE_SCRIPT_URL.includes(
                "https://script.google.com/macros/s/AKfycbyRkNKdCwCnsB5OS0M_ihFLY06dPcJW4AMZivroCPruaghc-OLJRgGR3jKxB-hO1GY/exec"
            )
        ) {

            showSubmissionError(
                "The enquiry system is not configured yet. Please contact the administrator."
            );

            return;

        }


        /* ---------------------------------------------
           Loading State
        ---------------------------------------------- */

        setLoading(true);


        try {


            /* -----------------------------------------
               Create Form Data
            ------------------------------------------ */

            const formData =
                new FormData(
                    enquiryForm
                );


            /*
             * Make sure Source is Facebook.
             */

            formData.set(
                "source",
                "Facebook"
            );


            /* -----------------------------------------
               Send to Apps Script
            ------------------------------------------ */

            const response =
                await fetch(
                    https://script.google.com/macros/s/AKfycbyRkNKdCwCnsB5OS0M_ihFLY06dPcJW4AMZivroCPruaghc-OLJRgGR3jKxB-hO1GY/exec,
                    {
                        method: "POST",
                        body: formData
                    }
                );


            /* -----------------------------------------
               Read response
            ------------------------------------------ */

            const result =
                await response.json();


            /* -----------------------------------------
               Handle result
            ------------------------------------------ */

            if (
                result &&
                result.success
            ) {

                showSuccess(
                    result.enquiryId
                );

            }
            else {

                throw new Error(
                    result.error ||
                    "Unable to submit enquiry."
                );

            }


        }
        catch (error) {

            console.error(
                "Submission error:",
                error
            );


            showSubmissionError(
                "We could not submit your enquiry. Please check your internet connection and try again."
            );

        }
        finally {

            setLoading(false);

        }

    }
);


/* =====================================================
   LOADING STATE
===================================================== */

function setLoading(
    loading
) {

    submitButton.disabled =
        loading;


    if (loading) {

        submitButton.classList.add(
            "loading"
        );

        buttonText.textContent =
            "SUBMITTING...";

    }
    else {

        submitButton.classList.remove(
            "loading"
        );

        buttonText.textContent =
            "SEND ENQUIRY";

    }

}


/* =====================================================
   SUCCESS
===================================================== */

function showSuccess(
    enquiryId
) {

    /*
     * Display Enquiry ID
     */

    successEnquiryId.textContent =
        enquiryId;


    /*
     * Hide form
     */

    enquiryForm.style.display =
        "none";


    /*
     * Show success screen
     */

    successScreen.classList.add(
        "active"
    );


    /*
     * Scroll to success screen
     */

    successScreen.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =====================================================
   SUBMISSION ERROR
===================================================== */

function showSubmissionError(
    message
) {

    /*
     * Use a normal alert for Phase 2.
     *
     * We can replace this with a beautiful
     * inline notification in the next polishing
     * phase.
     */

    alert(
        message
    );

}


/* =====================================================
   NEW ENQUIRY
===================================================== */

newEnquiryButton.addEventListener(
    "click",
    function () {

        /*
         * Reset form
         */

        enquiryForm.reset();


        /*
         * Reset character counter
         */

        characterCounter.textContent =
            "0 / 1000";


        /*
         * Clear errors
         */

        clearErrors();


        /*
         * Hide success
         */

        successScreen.classList.remove(
            "active"
        );


        /*
         * Show form
         */

        enquiryForm.style.display =
            "";


        /*
         * Scroll to top
         */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);
