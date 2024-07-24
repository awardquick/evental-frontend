import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const GuestUserModal = ({
  show,
  setShow,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  resetForm,
  timerId,
}) => {
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
        resetForm();
        clearInterval(timerId);
      }}
      centered
    >
      <Modal.Header className="border-0">
        <Modal.Title>
          <h6 className="heading_h6">Guest User</h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="modal_bg">
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              name="full_name"
              onChange={handleChange}
              value={values?.full_name}
              onBlur={handleBlur}
            />
            {touched.full_name && errors.full_name ? (
              <div className="text-danger">{errors.full_name}</div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              name="email"
              onChange={handleChange}
              value={values?.email}
              onBlur={handleBlur}
            />
            {touched.email && errors.email ? (
              <div className="text-danger">{errors.email}</div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Mobile no"
              name="mobile_no"
              onChange={handleChange}
              value={values?.mobile_no}
              onBlur={handleBlur}
            />
            {touched.mobile_no && errors.mobile_no ? (
              <div className="text-danger">{errors.mobile_no}</div>
            ) : null}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button
          variant="secondary"
          className="btn-theme-outline"
          onClick={() => {
            setShow(false);
            clearInterval(timerId);
            resetForm();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="btn-theme-fill"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GuestUserModal;
