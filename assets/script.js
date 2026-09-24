/* =========================================================
   ITSkillsAcademy Enquiry Form
   FINAL FRONTEND CONTROLLER
   ========================================================= */


/* =========================================================
   GOOGLE APPS SCRIPT URL
========================================================= */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyRkNKdCwCnsB5OS0M_ihFLY06dPcJW4AMZivroCPruaghc-OLJRgGR3jKxB-hO1GY/exec";


/* =========================================================
   APPLICATION
========================================================= */

function initializeEnquiryForm() {


    /* =====================================================
       DOM
    ===================================================== */

    const enquiryForm =
        document.getElementById(
            "enquiryForm"
        );

    const submitButton =
        document.getElementById(
            "submitButton"
        );

    const buttonText =
        document.getElementById(
            "buttonText"
        );

    const loadingSpinner =
        document.getElementById(
            "loadingSpinner"
        );

    const successScreen =
        document.getElementById(
            "successScreen"
        );

    const successEnquiryId =
        document.getElementById(
            "successEnquiryId"
        );

    const newEnquiryButton =
        document.getElementById(
            "newEnquiryButton"
        );

    const enquiryMessage =
        document.getElementById(
            "enquiryMessage"
        );

    const characterCounter =
        document.getElementById(
            "characterCounter"
        );

    const mobileInput =
        document.getElementById(
            "mobile"
        );


    if (!enquiryForm) {

        console.error(
            "ITSA Enquiry Form not found."
        );

        return;
    }


    /* =====================================================
       CHARACTER COUNTER
    ===================================================== */

    if (
        enquiryMessage &&
        characterCounter
    ) {

        enquiryMessage.addEventListener(
            "input",
            function () {

                characterCounter.textContent =
                    this.value.length +
                    " / 1000";

            }
        );

    }


    /* =====================================================
       MOBILE INPUT
    ===================================================== */

    if (mobileInput) {

        mobileInput.addEventListener(
            "input",
            function () {

                this.value =
                    this.value
                        .replace(
                            /\D/g,
                            ""
                        )
                        .slice(
                            0,
                            10
                        );

            }
        );

    }


    /* =====================================================
       VALIDATION
    ===================================================== */

    function validateForm() {

        let valid = true;

        clearErrors();


        const studentName =
            document.getElementById(
                "studentName"
            );

        if (
            !studentName ||
            !studentName.value.trim()
        ) {

            showError(
                "studentName",
                "Please enter student name."
            );

            valid = false;
        }


        const guardianName =
            document.getElementById(
                "guardianName"
            );

        if (
            !guardianName ||
            !guardianName.value.trim()
        ) {

            showError(
                "guardianName",
                "Please enter guardian name."
            );

            valid = false;
        }


        const guardianType =
            document.getElementById(
                "guardianType"
            );

        if (
            !guardianType ||
            !guardianType.value
        ) {

            showError(
                "guardianType",
                "Please select guardian type."
            );

            valid = false;
        }


        const mobile =
            document.getElementById(
                "mobile"
            );


        if (
            !mobile ||
            !/^[6-9]\d{9}$/.test(
                mobile.value.trim()
            )
        ) {

            showError(
                "mobile",
                "Enter a valid 10-digit mobile number."
            );

            valid = false;
        }


        const email =
            document.getElementById(
                "email"
            );


        if (
            email &&
            email.value.trim() &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                email.value.trim()
            )
        ) {

            showError(
                "email",
                "Please enter a valid email address."
            );

            valid = false;
        }


        const classEnquiryFor =
            document.getElementById(
                "classEnquiryFor"
            );


        if (
            !classEnquiryFor ||
            !classEnquiryFor.value
        ) {

            showError(
                "classEnquiryFor",
                "Please select the class."
            );

            valid = false;
        }


        const trainingType =
            document.querySelector(
                'input[name="trainingType"]:checked'
            );


        if (!trainingType) {

            const error =
                document.getElementById(
                    "trainingTypeError"
                );

            if (error) {

                error.textContent =
                    "Please select a training type.";

            }

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
            document.getElementById(
                fieldId
            );

        const error =
            document.getElementById(
                fieldId +
                "Error"
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
                function (element) {

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
                function (element) {

                    element.textContent =
                        "";

                }
            );

    }


    /* =====================================================
       LOADING
    ===================================================== */

    function setLoading(
        loading
    ) {

        if (submitButton) {

            submitButton.disabled =
                loading;

        }


        if (loading) {

            if (submitButton) {

                submitButton.classList.add(
                    "loading"
                );

            }


            if (buttonText) {

                buttonText.textContent =
                    "SUBMITTING...";

            }


            if (loadingSpinner) {

                loadingSpinner.style.display =
                    "inline-block";

            }

        }
        else {

            if (submitButton) {

                submitButton.classList.remove(
                    "loading"
                );

            }


            if (buttonText) {

                buttonText.textContent =
                    "SEND ENQUIRY";

            }


            if (loadingSpinner) {

                loadingSpinner.style.display =
                    "";

            }

        }

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHtml(
        value
    ) {

        return String(
            value
        )
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =====================================================
       SHOW SUCCESS
    ===================================================== */

    function showSubmissionSuccess(
        enquiryId
    ) {

        if (
            successEnquiryId
        ) {

            if (enquiryId) {

                successEnquiryId.innerHTML =
                    "Enquiry ID: <strong>" +
                    escapeHtml(
                        enquiryId
                    ) +
                    "</strong>";

            }
            else {

                successEnquiryId.textContent =
                    "Your enquiry has been submitted successfully.";

            }

        }


        enquiryForm.style.display =
            "none";


        if (successScreen) {

            successScreen.classList.add(
                "active"
            );


            successScreen.scrollIntoView({

                behavior:
                    "smooth",

                block:
                    "center"

            });

        }

    }


    /* =====================================================
       ERROR
    ===================================================== */

    function showSubmissionError(
        message
    ) {

        alert(
            message
        );

    }


    /* =====================================================
       RECEIVE RESPONSE FROM APPS SCRIPT
    ===================================================== */

    function handleAppsScriptMessage(
        event
    ) {

        if (
            !event ||
            !event.data
        ) {

            return;

        }


        const data =
            event.data;


        if (
            data.type !==
            "ITSA_ENQUIRY_RESULT"
        ) {

            return;

        }


        console.log(
            "Apps Script response received:",
            data
        );


        if (
            data.result &&
            data.result.success &&
            data.result.enquiryId
        ) {

            showSubmissionSuccess(
                data.result.enquiryId
            );


            setLoading(
                false
            );


            return;

        }


        setLoading(
            false
        );


        showSubmissionError(
            data.result &&
            data.result.error
                ? data.result.error
                : "Unable to submit enquiry."
        );

    }


    /* =====================================================
       LISTEN FOR APPS SCRIPT MESSAGE
    ===================================================== */

    window.addEventListener(
        "message",
        handleAppsScriptMessage,
        false
    );


    /* =====================================================
       FORM SUBMISSION
    ===================================================== */

    enquiryForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* ---------------------------------------------
               VALIDATION
            --------------------------------------------- */

            if (
                !validateForm()
            ) {

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
               CHECK URL
            --------------------------------------------- */

            if (
                !GOOGLE_SCRIPT_URL ||
                !GOOGLE_SCRIPT_URL.endsWith(
                    "/exec"
                )
            ) {

                showSubmissionError(
                    "The enquiry system is not configured correctly."
                );

                return;

            }


            /* ---------------------------------------------
               LOADING
            --------------------------------------------- */

            setLoading(
                true
            );


            /* ---------------------------------------------
               FORM DATA
            --------------------------------------------- */

            const formData =
                new FormData(
                    enquiryForm
                );


            formData.set(
                "source",
                "Facebook"
            );


            /* ---------------------------------------------
               CREATE IFRAME
            --------------------------------------------- */

            const frameName =
                "itsa_enquiry_frame_" +
                Date.now();


            const iframe =
                document.createElement(
                    "iframe"
                );


            iframe.name =
                frameName;


            iframe.id =
                frameName;


            iframe.style.display =
                "none";


            document.body.appendChild(
                iframe
            );


            /* ---------------------------------------------
               CREATE POST FORM
            --------------------------------------------- */

            const postForm =
                document.createElement(
                    "form"
                );


            postForm.method =
                "POST";


            postForm.action =
                GOOGLE_SCRIPT_URL;


            postForm.target =
                frameName;


            postForm.acceptCharset =
                "UTF-8";


            postForm.style.display =
                "none";


            /* ---------------------------------------------
               ADD FORM FIELDS
            --------------------------------------------- */

            for (
                const [
                    key,
                    value
                ]
                of formData.entries()
            ) {

                const input =
                    document.createElement(
                        "input"
                    );


                input.type =
                    "hidden";


                input.name =
                    key;


                input.value =
                    value == null
                        ? ""
                        : String(value);


                postForm.appendChild(
                    input
                );

            }


            document.body.appendChild(
                postForm
            );


            /* ---------------------------------------------
               SEND
            --------------------------------------------- */

            console.log(
                "Sending enquiry to Apps Script..."
            );


            try {

                postForm.submit();

            }

            catch (error) {

                console.error(
                    error
                );


                setLoading(
                    false
                );


                postForm.remove();
                iframe.remove();


                showSubmissionError(
                    "Unable to submit enquiry."
                );

                return;

            }


            /*
             * DO NOT show success here.
             *
             * We wait for the real Apps Script
             * postMessage containing the real ID.
             */

            setTimeout(
                function () {

                    if (
                        postForm &&
                        postForm.parentNode
                    ) {

                        postForm.remove();

                    }


                    if (
                        iframe &&
                        iframe.parentNode
                    ) {

                        iframe.remove();

                    }

                },
                15000
            );

        }
    );


    /* =====================================================
       NEW ENQUIRY
    ===================================================== */

    if (
        newEnquiryButton
    ) {

        newEnquiryButton.addEventListener(
            "click",
            function () {

                enquiryForm.reset();


                if (
                    characterCounter
                ) {

                    characterCounter.textContent =
                        "0 / 1000";

                }


                clearErrors();


                if (
                    successScreen
                ) {

                    successScreen.classList.remove(
                        "active"
                    );

                }


                enquiryForm.style.display =
                    "";


                setLoading(
                    false
                );


                window.scrollTo({

                    top:
                        0,

                    behavior:
                        "smooth"

                });

            }
        );

    }


    console.log(
        "ITSkillsAcademy Enquiry Form READY"
    );

}


/* =========================================================
   START
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeEnquiryForm
    );

}
else {

    initializeEnquiryForm();

}
