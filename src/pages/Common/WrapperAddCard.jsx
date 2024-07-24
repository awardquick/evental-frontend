/**
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta 
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import AddCardModal from "./AddCardModal";

function WrapperAddCard({ show, setShow, getSavedMyCard }) {
  const stripe = loadStripe(
    "pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"
  );
  return (
    <>
      <Elements stripe={stripe}>
        <AddCardModal
          show={show}
          setShow={setShow}
          getSavedMyCard={getSavedMyCard}
        />
      </Elements>
    </>
  );
}

export default WrapperAddCard;
