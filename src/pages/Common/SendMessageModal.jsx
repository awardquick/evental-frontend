import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const SendMessageModal = ({
  show,
  setShow,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  resetForm,
}) => {
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
        resetForm();
      }}
      centered
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>
          <h6 className="heading_h6">Send Message</h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="modal_bg">
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Your message"
              name="message"
              onChange={handleChange}
              value={values?.message}
              onBlur={handleBlur}
            />
            {touched.message && errors.message ? (
              <div className="text-danger">{errors.message}</div>
            ) : null}
          </Form.Group>
        </Form>
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
          Send Message
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SendMessageModal;
