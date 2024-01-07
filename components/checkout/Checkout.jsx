import React, { useRef, useState } from "react";
import styles from "./Checkout.module.css";
import WhiteBox from "../ui/WhiteBox";
import Modal from "../ui/Modal";
import SuccessMessage from "./SuccessMessage";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Checkout = () => {
  const { data, status } = useSession();
  const [displayMessage, setDisplayMessage] = useState(false);
  const router = useRouter();
  const nameRef = useRef();
  const addressRef = useRef();
  const contactNumberRef = useRef();
  const cardNumberRef = useRef();
  const validTillRef = useRef();
  const cvvRef = useRef();

  const handleWheel = (e) => {
    e.preventDefault();
  };

  const closeMessageHandler = async () => {
    const response = await fetch("/api/cart/emptyCart", {
      method: "DELETE",
      body: JSON.stringify({ username: data.user.name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setDisplayMessage(false);
      router.replace("/");
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const address = addressRef.current.value;
    const contactNumber = contactNumberRef.current.value;
    const cardNumber = cardNumberRef.current.value;
    const validTill = validTillRef.current.value;
    const cvv = cvvRef.current.value;

    if (name && address && contactNumber && cardNumber && validTill && cvv) {
      setDisplayMessage(true);
    }
  };

  return (
    <WhiteBox title={"CHECKOUT"}>
      {displayMessage && (
        <Modal type="success">
          <SuccessMessage closeMessage={closeMessageHandler} />
        </Modal>
      )}
      <form className={styles.shippingForm} onSubmit={submitHandler}>
        <div className={styles.contactDetails}>
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Swapnil Mannurkar"
            ref={nameRef}
            required
          />
          <label>Address:</label>
          <input
            type="text"
            name="address"
            placeholder="Belgaum, Karnataka, Bharat"
            ref={addressRef}
            required
          />
          <label>Contact Number:</label>
          <input
            type="number"
            name="contactNumber"
            placeholder="+91 924 223 9078"
            maxLength={10}
            onWheel={handleWheel}
            ref={contactNumberRef}
            required
          />
        </div>
        <div className={styles.paymentDetails}>
          <label>Card Number:</label>
          <input
            type="number"
            name="cardNumber"
            placeholder="1234 5678 1234"
            onWheel={handleWheel}
            ref={cardNumberRef}
            required
          />
          <div className={styles.paymentDetailsColumn}>
            <div className={styles.paymentDetailsRow}>
              <label>Valid till:</label>
              <input
                type="month"
                name="validTill"
                placeholder="12/25"
                ref={validTillRef}
                required
              />
            </div>
            <div className={styles.paymentDetailsRow}>
              <label>CVV:</label>
              <input
                type="text"
                name="cvv"
                placeholder="123"
                maxLength={3}
                ref={cvvRef}
                required
              />
            </div>
          </div>
        </div>
        <div className={styles.action}>
          <button>Place order</button>
        </div>
      </form>
    </WhiteBox>
  );
};

export default Checkout;
