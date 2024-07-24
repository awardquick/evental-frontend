import React, { useState } from "react";
import Step1 from "./StepForm/Step1";
import Step2 from "./StepForm/Step2";
import Step3 from "./StepForm/Step3";
import Step4 from "./StepForm/Step4";
import Step5 from "./StepForm/Step5";

const EventerSignup = () => {
  const [steps, setSteps] = useState(1);
  const [progressPercent, setProgressPercent] = useState(20);

  const nextStep = () => {
    setSteps(steps + 1);
    setProgressPercent(progressPercent + 20);
  };

  const prevStep = () => {
    setSteps(steps - 1);
    setProgressPercent(progressPercent - 20);
  };

  const [firstForm, setFirstForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    company_name: "",
    eni:"",
    driving_licence: "",
    your_selfie: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [secondForm, setSecondForm] = useState({
    card_number: "",
    expiry: "",
    cvv: "",
    country: "",
    zip: "",
  });
  const [thirdForm, setThirdForm] = useState({
    product_type: "",
    product_name: "",
    discription: "",
    disclaimer: "",
    breakdown_time: "",
    electricity_needed: "",
    wifi_needed: "",
    printing_included: "",
    eni:"",
    setup_time: "",
    size: "",
    product_photo: [],
  });
  const [forthForm, setForthForm] = useState({
    start_date: "",
    end_date: "",
    advance_notice_time: 24,
    is_custom_advance_notice: false,
    time_between_booking: 3,
    max_per_day_booking: 1,
    state: "",
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    miles_you_will_deliver: 2,
    is_custom_delivery_distance: false,
  });
  const [fifthForm, setFifthForm] = useState({
    is_pricing_2_hours: true,
    pricing_2_hours: "",
    is_pricing_4_hours: false,
    pricing_4_hours: "",
    is_pricing_8_hours: false,
    pricing_8_hours: "",
    is_pricing_12_hours: false,
    pricing_12_hours: "",
    is_pricing_1_day: false,
    pricing_1_day: "",
    is_additional_fee: false,
    additional_fee: "",
    upto_20_miles: "",
    after_20_miles: "",
    terms: false,
  });
  const allValues = {
    ...firstForm,
    ...secondForm,
    ...thirdForm,
    ...forthForm,
    ...fifthForm,
  };

  switch (steps) {
    case 1:
      return (
        <>
          <Step1
            nextStep={nextStep}
            progressPercent={progressPercent}
            steps={steps}
            firstForm={firstForm}
            setFirstForm={setFirstForm}
          />
        </>
      );
    case 2:
      return (
        <>
          <Step2
            prevStep={prevStep}
            nextStep={nextStep}
            progressPercent={progressPercent}
            steps={steps}
            secondForm={secondForm}
            setSecondForm={setSecondForm}
          />
          ;
        </>
      );
    case 3:
      return (
        <>
          <Step3
            prevStep={prevStep}
            nextStep={nextStep}
            progressPercent={progressPercent}
            steps={steps}
            thirdForm={thirdForm}
            setThirdForm={setThirdForm}
          />
          ;
        </>
      );
    case 4:
      return (
        <Step4
          prevStep={prevStep}
          nextStep={nextStep}
          progressPercent={progressPercent}
          steps={steps}
          forthForm={forthForm}
          setForthForm={setForthForm}
        />
      );
    case 5:
      return (
        <Step5
          prevStep={prevStep}
          progressPercent={progressPercent}
          steps={steps}
          fifthForm={fifthForm}
          setFifthForm={setFifthForm}
          allValues={allValues}
        />
      );

    default:
      break;
  }
};

export default EventerSignup;
