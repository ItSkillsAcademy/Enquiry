/* =========================================================
   ITSkillsAcademy Enquiry Form
   Frontend Controller
   FINAL CLEAN VERSION
   ========================================================= */


/* =========================================================
   GOOGLE APPS SCRIPT WEB APP URL
   ========================================================= */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyRkNKdCwCnsB5OS0M_ihFLY06dPcJW4AMZivroCPruaghc-OLJRgGR3jKxB-hO1GY/exec";


/* =========================================================
   APPLICATION INITIALIZATION
   ========================================================= */

function initializeEnquiryForm() {

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

    const mobileInput =
        document.getElementById("mobile");


    /* =====================================================
       CHECK FORM
       ===================================================== */

    if (!enquiryForm) {

        console.error(
            "ITSA Enquiry Form: #enquiryForm not found."
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

                const length =
                    this.value.length;

                characterCounter.textContent =
                    `${length} / 1000`;

            }
        );

    }


    /* =====================================================
       MOBILE NUMBER INPUT
       ===================================================== */

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
       VALIDATION
       ===================================================== */

    function validateForm() {

        let valid = true;

        clearErrors();


        /* -------------------------------------------------
           STUDENT NAME
           ------------------------------------------------- */

        const studentNameField =
            document.getElementById(
                "studentName"
            );

        const studentName =
            studentNameField
                ? studentNameField.value.trim()
                : "";

        if (!studentName) {

            showError(
                "studentName",
                "Please enter student name."
            );

            valid = false;
        }


        /* -------------------------------------------------
           GUARDIAN NAME
           ------------------------------------------------- */

        const guardianNameField =
            document.getElementById(
                "guardianName"
            );

        const guardianName =
            guardianNameField
                ? guardianNameField.value.trim()
                : "";

        if (!guardianName) {

            showError(
                "guardianName",
                "Please enter guardian name."
            );

            valid = false;
        }


        /* -------------------------------------------------
           GUARDIAN TYPE
           ------------------------------------------------- */

        const guardianTypeField =
            document.getElementById(
                "guardianType"
            );

        const guardianType =
            guardianTypeField
                ? guardianTypeField.value
                : "";

        if (!guardianType) {

            showError(
                "guardianType",
                "Please select guardian type."
            );

            valid = false;
        }


        /* -------------------------------------------------
           MOBILE
           ------------------------------------------------- */

        const mobileField =
            document.getElementById(
                "mobile"
            );

        const mobile =
            mobileField
                ? mobileField.value.trim()
                : "";

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


        /* -------------------------------------------------
           EMAIL
           Optional
           ------------------------------------------------- */

        const emailField =
            document.getElementById(
                "email"
            );

        const email =
            emailField
                ? emailField.value.trim()
                : "";

        if (email) {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (
                !emailPattern.test(email)
            ) {

                showError(
                    "email",
                    "Please enter a valid email address."
                );

                valid = false;
            }
        }


        /* -------------------------------------------------
           CLASS ENQUIRY FOR
           ------------------------------------------------- */

        const classField =
            document.getElementById(
                "classEnquiryFor"
            );

        const classEnquiryFor =
            classField
                ? classField.value
                : "";

        if (!classEnquiryFor) {

            showError(
                "classEnquiryFor",
                "Please select the class."
            );

            valid = false;
        }


        /* -------------------------------------------------
           TRAINING TYPE
           ------------------------------------------------- */

        const trainingType =
            document.querySelector(
                'input[name="trainingType"]:checked'
            );

        if (!trainingType) {

            const trainingError =
                document.getElementById(
                    "trainingTypeError"
                );

            if (trainingError) {

                trainingError.textContent =
                    "Please select a training type.";

            }

            valid = false;
        }


        return valid;
    }


    /* =====================================================
       SHOW FIELD ERROR
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

                    element.textContent = "";

                }
            );
    }


    /* =====================================================
       REMOVE ERROR WHEN USER CORRECTS FIELD
       ===================================================== */

    document
        .querySelectorAll(
            "#enquiryForm input, " +
            "#enquiryForm select, " +
            "#enquiryForm textarea"
        )
        .forEach(
            function (element) {

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
       LOADING STATE
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
       SHOW SUCCESS
       ===================================================== */

    function showSubmissionSuccess() {

        if (!enquiryForm) {
            return;
        }

        if (successEnquiryId) {

            successEnquiryId.textContent =
                "Your enquiry has been submitted successfully.";
        }

        enquiryForm.style.display =
            "none";


        if (successScreen) {

            successScreen.classList.add(
                "active"
            );

            successScreen.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }


    /* =====================================================
       SHOW ERROR
       ===================================================== */

    function showSubmissionError(
        message
    ) {

        alert(message);
    }


    /* =====================================================
       FORM SUBMISSION
       ===================================================== */

    enquiryForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            console.log(
                "========================================"
            );

            console.log(
                "ITSA ENQUIRY SUBMISSION STARTED"
            );

            console.log(
                "========================================"
            );


            /* ---------------------------------------------
               VALIDATE
               --------------------------------------------- */

            if (!validateForm()) {

                console.warn(
                    "ITSA Enquiry: validation failed."
                );

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
               CHECK GOOGLE SCRIPT URL
               --------------------------------------------- */

            if (
                !GOOGLE_SCRIPT_URL ||
                GOOGLE_SCRIPT_URL.includes(
                    "YOUR_GOOGLE_SCRIPT_URL"
                ) ||
                !GOOGLE_SCRIPT_URL.includes(
                    "script.google.com/macros/s/"
                ) ||
                !GOOGLE_SCRIPT_URL.endsWith(
                    "/exec"
                )
            ) {

                console.error(
                    "ITSA Enquiry: invalid Apps Script URL."
                );

                showSubmissionError(
                    "The enquiry system is not configured correctly. Please contact the administrator."
                );

                return;
            }


            /* ---------------------------------------------
               START LOADING
               --------------------------------------------- */

            setLoading(true);


            /* ---------------------------------------------
               COLLECT FORM DATA
               --------------------------------------------- */

            const formData =
                new FormData(
                    enquiryForm
                );


            /* ---------------------------------------------
               SOURCE
               --------------------------------------------- */

            formData.set(
                "source",
                "Facebook"
            );


            /* ---------------------------------------------
               DEBUG FORM DATA
               --------------------------------------------- */

            console.log(
                "ITSA Enquiry: form data"
            );

            for (
                const [key, value]
                of formData.entries()
            ) {

                console.log(
                    key + " = " + value
                );
            }


            /* ---------------------------------------------
               UNIQUE IFRAME NAME
               --------------------------------------------- */

            const frameName =
                "itsa_enquiry_" +
                Date.now();


            /* ---------------------------------------------
               CREATE HIDDEN IFRAME
               --------------------------------------------- */

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
               CREATE NATIVE POST FORM
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
               ADD ALL FORM VALUES
               --------------------------------------------- */

            for (
                const [key, value]
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


            /* ---------------------------------------------
               ADD POST FORM TO DOCUMENT
               --------------------------------------------- */

            document.body.appendChild(
                postForm
            );


            console.log(
                "ITSA Enquiry: sending POST request."
            );

            console.log(
                "Target:",
                GOOGLE_SCRIPT_URL
            );


            /* ---------------------------------------------
               SEND POST
               --------------------------------------------- */

            try {

                postForm.submit();

                console.log(
                    "ITSA Enquiry: POST request sent."
                );

            }
            catch (error) {

                console.error(
                    "ITSA Enquiry: POST failed.",
                    error
                );

                setLoading(false);

                postForm.remove();
                iframe.remove();

                showSubmissionError(
                    "We could not submit your enquiry. Please try again."
                );

                return;
            }


            /* ---------------------------------------------
               WAIT FOR APPS SCRIPT
               --------------------------------------------- */

            setTimeout(
                function () {

                    console.log(
                        "ITSA Enquiry: submission process completed."
                    );


                    setLoading(
                        false
                    );


                    /*
                     * Google Apps Script is cross-origin.
                     * The browser will not allow this page
                     * to read the returned JSON response.
                     *
                     * The native POST itself has already
                     * been sent to Apps Script.
                     */

                    showSubmissionSuccess();


                    /* -----------------------------------------
                       CLEAN TEMPORARY ELEMENTS
                       ----------------------------------------- */

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
                        1000
                    );

                },
                5000
            );

        }
    );


    /* =====================================================
       NEW ENQUIRY BUTTON
       ===================================================== */

    if (newEnquiryButton) {

        newEnquiryButton.addEventListener(
            "click",
            function () {


                /* -----------------------------------------
                   RESET FORM
                   ----------------------------------------- */

                enquiryForm.reset();


                /* -----------------------------------------
                   RESET CHARACTER COUNTER
                   ----------------------------------------- */

                if (characterCounter) {

                    characterCounter.textContent =
                        "0 / 1000";
                }


                /* -----------------------------------------
                   CLEAR ERRORS
                   ----------------------------------------- */

                clearErrors();


                /* -----------------------------------------
                   HIDE SUCCESS SCREEN
                   ----------------------------------------- */

                if (successScreen) {

                    successScreen.classList.remove(
                        "active"
                    );
                }


                /* -----------------------------------------
                   SHOW FORM
                   ----------------------------------------- */

                enquiryForm.style.display =
                    "";


                /* -----------------------------------------
                   RESET BUTTON
                   ----------------------------------------- */

                setLoading(
                    false
                );


                /* -----------------------------------------
                   SCROLL TOP
                   ----------------------------------------- */

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );
    }


    /* =====================================================
       INITIALIZATION COMPLETE
       ===================================================== */

    console.log(
        "========================================"
    );

    console.log(
        "ITSkillsAcademy Enquiry Form READY"
    );

    console.log(
        "Google Apps Script:",
        GOOGLE_SCRIPT_URL
    );

    console.log(
        "========================================"
    );

}


/* =========================================================
   START APPLICATION
   ========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeEnquiryForm
    );

}
else {

    initializeEnquiryForm();

}
