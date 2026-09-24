javascript
/* =====================================================
   ITSkillsAcademy Enquiry Form
   Frontend Controller
   Phase 2
===================================================== */


/* =====================================================
   GOOGLE APPS SCRIPT WEB APP URL
=====================================================

   IMPORTANT:
   Replace ONLY the URL below with your deployed
   Google Apps Script /exec URL.

   Example:
  

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

if (enquiryMessage && characterCounter) {

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


    /* -----------------------------------------------
       Clear previous errors
    ------------------------------------------------ */

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
       Mobile Number
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
       Email Address
       Optional field
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
       Class Enquiry For
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
   CLEAR ALL ERRORS
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
   REMOVE ERROR WHEN USER CORRECTS FIELD
===================================================== */

document
    .querySelectorAll(
        "#enquiryForm input, #enquiryForm select, #enquiryForm textarea"
    )
    .forEach(
        element => {


            /* -----------------------------------------
               Input event
            ------------------------------------------ */

            element.addEventListener(
                "input",
                function () {

                    this.classList.remove(
                        "input-error"
                    );

                }
            );


            /* -----------------------------------------
               Change event
            ------------------------------------------ */

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
           STEP 1 — Validate form
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
           STEP 2 — Check API URL
           
           IMPORTANT:
           We check for the PLACEHOLDER,
           NOT the actual URL.
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
           STEP 3 — Loading state
        ---------------------------------------------- */

        setLoading(true);


        try {


            /* -----------------------------------------
               STEP 4 — Create FormData
            ------------------------------------------ */

            const formData =
                new FormData(
                    enquiryForm
                );


            /* -----------------------------------------
               STEP 5 — Set source
               
               This ensures the Google Sheet receives:
               Facebook
            ------------------------------------------ */

            formData.set(
                "source",
                "Facebook"
            );


            /* -----------------------------------------
               STEP 6 — Send data to Apps Script
               
               IMPORTANT:
               Use GOOGLE_SCRIPT_URL here.
               Do NOT put the URL directly into fetch().
            ------------------------------------------ */
            const postData = new
			URLSearchParams();
			
			for (const [key, value] of
			formData.entries()) {
			postData.append(key, value);
			}
			const iframe = document.createElement("iframe");

iframe.name = "googleScriptFrame";
iframe.style.display = "none";

document.body.appendChild(iframe);

const nativeForm = document.createElement("form");

nativeForm.method = "POST";
nativeForm.action = GOOGLE_SCRIPT_URL;
nativeForm.target = "googleScriptFrame";
nativeForm.style.display = "none";

for (const [key, value] of formData.entries()) {
    const input = document.createElement("input");

    input.type = "hidden";
    input.name = key;
    input.value = value;

    nativeForm.appendChild(input);
}

document.body.appendChild(nativeForm);

nativeForm.submit();

setTimeout(() => {

    submitButton.disabled = false;
    submitButton.textContent = "SEND ENQUIRY";

    alert("Your enquiry has been submitted successfully!");

    enquiryForm.reset();

    nativeForm.remove();
    iframe.remove();

}, 5000);		
			        
            /* -----------------------------------------
               STEP 7 — Read server response
            ------------------------------------------ */

            const result =
                await response.json();


            /* -----------------------------------------
               STEP 8 — Handle successful response
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


            /* -----------------------------------------
               STEP 9 — Handle submission error
            ------------------------------------------ */

            console.error(
                "Submission error:",
                error
            );


            showSubmissionError(
                "We could not submit your enquiry. Please check your internet connection and try again."
            );

        }
        finally {


            /* -----------------------------------------
               STEP 10 — Stop loading state
            ------------------------------------------ */

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
   SHOW SUCCESS SCREEN
===================================================== */

function showSuccess(
    enquiryId
) {


    /* -----------------------------------------------
       Display Enquiry ID
    ------------------------------------------------ */

    successEnquiryId.textContent =
        enquiryId;


    /* -----------------------------------------------
       Hide form
    ------------------------------------------------ */

    enquiryForm.style.display =
        "none";


    /* -----------------------------------------------
       Show success screen
    ------------------------------------------------ */

    successScreen.classList.add(
        "active"
    );


    /* -----------------------------------------------
       Scroll to success message
    ------------------------------------------------ */

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
     * Phase 2 uses a browser alert.
     *
     * We can replace this later with a beautiful
     * inline notification without changing the
     * backend.
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


        /* ---------------------------------------------
           Reset form
        ---------------------------------------------- */

        enquiryForm.reset();


        /* ---------------------------------------------
           Reset character counter
        ---------------------------------------------- */

        if (characterCounter) {

            characterCounter.textContent =
                "0 / 1000";

        }


        /* ---------------------------------------------
           Clear validation errors
        ---------------------------------------------- */

        clearErrors();


        /* ---------------------------------------------
           Hide success screen
        ---------------------------------------------- */

        successScreen.classList.remove(
            "active"
        );


        /* ---------------------------------------------
           Show form again
        ---------------------------------------------- */

        enquiryForm.style.display =
            "";


        /* ---------------------------------------------
           Scroll to top
        ---------------------------------------------- */

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);
