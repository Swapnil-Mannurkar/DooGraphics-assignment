import React, { useEffect, useState } from "react";
import styles from "./NavigationBar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { AiFillHome } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

const NavigationBar = () => {
  const router = useRouter();
  const { data, status } = useSession();

  const pathname = router.pathname;

  // useEffect(() => {
  //   if (data) {
  //     fetch(`/api/cart/getTotalItems?username=${data.user.name}`)
  //       .then((response) => response.json())
  //       .then((result) => localStorage.setItem("totalItems", result.totalItems))
  //       .catch((err) => console.log(err));
  //   }
  // }, [router]);

  const loginLogoutClickHandler = (event) => {
    event.preventDefault();

    if (data) {
      signOut({ redirect: true });
    } else {
      router.replace("/auth");
    }
  };

  const itemStyle = { color: "black", fontWeight: "bolder" };

  return (
    <nav className={styles.navigationBar}>
      <Link href="/">
        <h1 className={styles.logo}>E-COMMERCE</h1>
      </Link>
      <ul className={styles.navList}>
        <li style={pathname === "/" ? itemStyle : {}}>
          <Link href={"/"}>
            <AiFillHome />
            Home
          </Link>
        </li>
        {data && (
          <>
            <li style={pathname === "/cart" ? itemStyle : {}}>
              <Link href={"/cart"}>
                <FaShoppingCart />
                Cart
              </Link>
            </li>
          </>
        )}
        <li>
          <button onClick={loginLogoutClickHandler}>
            {data ? "Logout" : "Login"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
