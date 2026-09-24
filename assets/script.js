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
   INITIALIZE APPLICATION
========================================================= */

function initializeEnquiryForm() {


    /* =====================================================
       DOM ELEMENTS
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


    /* =====================================================
       FORM EXISTENCE CHECK
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


        /* -------------------------------------------------
           STUDENT NAME
        ------------------------------------------------- */

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


        /* -------------------------------------------------
           GUARDIAN NAME
        ------------------------------------------------- */

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


        /* -------------------------------------------------
           GUARDIAN TYPE
        ------------------------------------------------- */

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


        /* -------------------------------------------------
           MOBILE
        ------------------------------------------------- */

        const mobile =
            document.getElementById(
                "mobile"
            );


        const mobilePattern =
            /^[6-9]\d{9}$/;


        if (
            !mobile ||
            !mobile.value.trim()
        ) {

            showError(
                "mobile",
                "Please enter mobile number."
            );

            valid = false;

        }
        else if (
            !mobilePattern.test(
                mobile.value.trim()
            )
        ) {

            showError(
                "mobile",
                "Enter a valid 10-digit mobile number."
            );

            valid = false;

        }


        /* -------------------------------------------------
           EMAIL
        ------------------------------------------------- */

        const email =
            document.getElementById(
                "email"
            );


        if (
            email &&
            email.value.trim()
        ) {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    email.value.trim()
                )
            ) {

                showError(
                    "email",
                    "Please enter a valid email address."
                );

                valid = false;

            }

        }


        /* -------------------------------------------------
           CLASS
        ------------------------------------------------- */

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


        /* -------------------------------------------------
           TRAINING TYPE
        ------------------------------------------------- */

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
       CLEAR ERROR WHEN USER EDITS FIELD
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
       GENERATE CLIENT TOKEN
    ===================================================== */

    function generateClientToken() {

        if (
            window.crypto &&
            typeof window.crypto.randomUUID ===
                "function"
        ) {

            return window.crypto.randomUUID();

        }


        return (
            Date.now().toString(36) +
            "_" +
            Math.random()
                .toString(36)
                .substring(2) +
            "_" +
            Math.random()
                .toString(36)
                .substring(2)
        );

    }


    /* =====================================================
       JSONP LOOKUP
    ===================================================== */

    function lookupEnquiryId(
        token
    ) {

        return new Promise(
            function (resolve) {

                const callbackName =
                    "itsaCallback_" +
                    Date.now() +
                    "_" +
                    Math.floor(
                        Math.random() *
                        100000
                    );


                const script =
                    document.createElement(
                        "script"
                    );


                let completed =
                    false;


                function cleanup() {

                    if (
                        script &&
                        script.parentNode
                    ) {

                        script.parentNode.removeChild(
                            script
                        );

                    }


                    try {

                        delete window[
                            callbackName
                        ];

                    }
                    catch (error) {

                        window[
                            callbackName
                        ] = undefined;

                    }

                }


                window[
                    callbackName
                ] = function (
                    result
                ) {

                    if (completed) {
                        return;
                    }


                    completed =
                        true;


                    cleanup();


                    if (
                        result &&
                        result.success &&
                        result.found &&
                        result.enquiryId
                    ) {

                        resolve(
                            result.enquiryId
                        );

                    }
                    else {

                        resolve(
                            null
                        );

                    }

                };


                script.onerror =
                    function () {

                        if (completed) {
                            return;
                        }


                        completed =
                            true;


                        cleanup();


                        resolve(
                            null
                        );

                    };


                setTimeout(
                    function () {

                        if (completed) {
                            return;
                        }


                        completed =
                            true;


                        cleanup();


                        resolve(
                            null
                        );

                    },
                    4000
                );


                script.src =
                    GOOGLE_SCRIPT_URL +
                    "?action=getEnquiryId" +
                    "&token=" +
                    encodeURIComponent(
                        token
                    ) +
                    "&callback=" +
                    encodeURIComponent(
                        callbackName
                    );


                document.head.appendChild(
                    script
                );

            }
        );

    }


    /* =====================================================
       WAIT FOR REAL ENQUIRY ID
    ===================================================== */

    async function waitForEnquiryId(
        token
    ) {

        /*
         * Give Apps Script time to finish
         * the POST and save the property.
         */

        for (
            let attempt = 1;
            attempt <= 10;
            attempt++
        ) {

            console.log(
                "Enquiry ID lookup attempt:",
                attempt
            );


            const enquiryId =
                await lookupEnquiryId(
                    token
                );


            if (enquiryId) {

                return enquiryId;

            }


            await new Promise(
                function (resolve) {

                    setTimeout(
                        resolve,
                        1000
                    );

                }
            );

        }


        return null;

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
       SUCCESS SCREEN
    ===================================================== */

    function showSubmissionSuccess(
        enquiryId
    ) {

        if (!enquiryForm) {
            return;
        }


        if (successEnquiryId) {

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
       SUBMISSION ERROR
    ===================================================== */

    function showSubmissionError(
        message
    ) {

        alert(
            message
        );

    }


    /* =====================================================
       FORM SUBMISSION
    ===================================================== */

    enquiryForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* ---------------------------------------------
               VALIDATE
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
               CHECK APPS SCRIPT URL
            --------------------------------------------- */

            if (
                !GOOGLE_SCRIPT_URL ||
                !GOOGLE_SCRIPT_URL.includes(
                    "script.google.com/macros/s/"
                ) ||
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
               START LOADING
            --------------------------------------------- */

            setLoading(
                true
            );


            /* ---------------------------------------------
               GENERATE TOKEN
            --------------------------------------------- */

            const clientToken =
                generateClientToken();


            console.log(
                "ITSA client token:",
                clientToken
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


            formData.set(
                "clientToken",
                clientToken
            );


            /* ---------------------------------------------
               HIDDEN IFRAME
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
               NATIVE POST FORM
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
               ADD ALL DATA
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
               SEND POST
            --------------------------------------------- */

            try {

                postForm.submit();

                console.log(
                    "ITSA enquiry POST sent."
                );

            }
            catch (error) {

                console.error(
                    "ITSA POST error:",
                    error
                );


                setLoading(
                    false
                );


                postForm.remove();
                iframe.remove();


                showSubmissionError(
                    "We could not submit your enquiry. Please try again."
                );


                return;

            }


            /* ---------------------------------------------
               WAIT FOR REAL ID
            --------------------------------------------- */

            const enquiryId =
                await waitForEnquiryId(
                    clientToken
                );


            /* ---------------------------------------------
               CLEANUP
            --------------------------------------------- */

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


            /* ---------------------------------------------
               STOP LOADING
            --------------------------------------------- */

            setLoading(
                false
            );


            /* ---------------------------------------------
               DISPLAY RESULT
            --------------------------------------------- */

            if (enquiryId) {

                console.log(
                    "REAL ENQUIRY ID:",
                    enquiryId
                );


                showSubmissionSuccess(
                    enquiryId
                );

            }
            else {

                console.warn(
                    "ID lookup timed out."
                );


                showSubmissionSuccess(
                    null
                );

            }

        }
    );


    /* =====================================================
       NEW ENQUIRY
    ===================================================== */

    if (newEnquiryButton) {

        newEnquiryButton.addEventListener(
            "click",
            function () {

                enquiryForm.reset();


                if (characterCounter) {

                    characterCounter.textContent =
                        "0 / 1000";

                }


                clearErrors();


                if (successScreen) {

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


    /* =====================================================
       READY
    ===================================================== */

    console.log(
        "ITSkillsAcademy Enquiry Form READY"
    );

}


/* =========================================================
   START APPLICATION
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
