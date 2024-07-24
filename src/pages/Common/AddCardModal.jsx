import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { addCardWithStripe } from "../../services/eventee-service";
import { toastAlert } from "../../utils/SweetAlert";

const AddCardModal = ({ show, setShow, getSavedMyCard }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    const paymentResult = await stripe.createToken(
      elements.getElement(CardElement)
    );
    if (paymentResult.error) {
      toastAlert("error", paymentResult?.error?.message);
      return;
    } else {
      const formData = new FormData();
      formData.append("id", paymentResult?.token?.id);
      addCardWithStripe(formData).then((resp) => {
        if (resp?.status === 200) {
          setShow(false);
          getSavedMyCard();
        }
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
      }}
      centered
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>
          <h6 className="heading_h6">Add Card</h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CardElement
          options={{ hidePostalCode: true }}
        />
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button
          variant="secondary"
          className="btn-theme-outline"
          onClick={() => setShow(false)}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="btn-theme-fill"
          onClick={handleSubmit}
        >
          Add Card
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCardModal;
