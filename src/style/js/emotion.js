import { css } from "@emotion/react";
import variables from "./variables";

export const contactStyle = css({
  textAlign: "start",
  fontFamily: 'Poppins, "sans-serif"',
  padding: "1rem",
  position: "relative",
  minHeight:'calc(100vh - 65.6px - 3rem)'
});

export const listContactStyle = css({
  display: "grid",
  marginInline: "-1rem",
});

export const contactTitleStyle = css({
  fontSize: "1.5rem",
  fontWeight: "800",
  textAlign: "center",
  color: variables.gotoBlack,
  margin: "0",
  marginTop: "1rem",

  "+ span": {
    color: variables.gotoBlackThird,
  },
});

export const contactSubtitleStyle = css({
  marginTop: "2rem",
  fontSize: "1.125rem",
  fontWeight: "700",
  color: variables.gotoBlack,
});

export const shortcutContactStyle = css({
  display: "flex",
  marginLeft: "-1rem",
  paddingInline: "1rem 2rem",
  maxWidth: "max-content",
  borderTopRightRadius: "2rem",
  borderBottomRightRadius: "2rem",
  border: `1px solid ${variables.gotoGrey}`,
  gap: ".5rem",
  background: variables.gotoLight,
  color: variables.gotoBlackSec,
  cursor: "pointer",
  marginBottom: "1rem",

  span: {
    fontSize: 14,
    padding: ".75rem",
    color: variables.gotoBlackSec,
    fontWeight: 500,
    overflow: "hidden",
    position: "relative",

    "&:after": {
      bottom: "-1px",
      position: "absolute",
      content: "' '",
      display: "block",
      height: "3px",
      background: variables.gotoGreen,
      transform: "translateX(-150%)",
      transition: "transform .25s linear",
    },
  },

  ".active": {
    color: variables.gotoGreen,
    fontWeight: 600,

    "&:after": {
      content: "' '",
      left: "50%",
      width: "100%",
      display: "block",
      height: "3px",
      background: variables.gotoGreen,
      transform: "translateX(-50%)",
    },
  },

  "span:hover": {
    color: variables.gotoGreen,
  },
});

export const searchContactStyle = css({
  position: "relative",
  marginBlock: "1rem",
  display: "flex",

  input: {
    padding: "0.75rem 0 .75rem 4rem",
    borderRadius: "3rem",
    border: "1px solid transparent",
    display: "block",
    flex: "1",
    fontSize: "14px",
    background: variables.gotoLight,

    "&::placeholder": {
      color: variables.gotoGreyDark,
    },

    "&:focus": {
      border: `1px solid ${variables.gotoGrey}`,
    },

    "&:focus-visible": {
      outline: 0,
    },
  },

  i: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: 0,
    fontSize: "1.125rem",
    color: "white",
    background: `linear-gradient(225deg, ${variables.gotoGreen} 50%, ${variables.gotoGreenDarker} 100%)`,
    padding: ".8rem",
    borderRadius: "50%",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  },
});

export const contactFavStyle = css({
  display: "grid",
  gridTemplateColumns: "repeat(4,60px)",
  justifyContent: "start",
  gap: "1rem",
  marginBottom: "1rem",
  textAlign: "center",

  span: {
    fontSize: 14,
    paddingTop: ".25rem",
    width: "100%",
    margin: "0 0 1em 0",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
  },
});

export const contactFavItemStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  textDecoration: "none",

  "&:active i.fa-user-o": {
    background: variables.gotoGreenDarker,
  },

  "& i.fa-user-o": {
    position: "relative",
    fontSize: "1rem",
    padding: "1rem",
    background: variables.gotoGreen,
    borderRadius: "50%",
    width: "1rem",
    height: "1rem",
    color: variables.gotoWhite,
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",

    "&::before": {
      display: "flex",
      justifyContent: "center",
    },
  },

  "i.fa-heart": {
    color: variables.gotoGreenDark,
    position: "absolute",
    top: "0",
    right: "0",
  },

  span: {
    color: variables.gotoBlack,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});

export const contactAddStyle = css({
  cursor: "pointer",
  position: "absolute",
  top: "2rem",
  right: "1rem",
  display: "block",
  padding: "0 .6125rem",
  borderRadius: "50%",
  border: `1px solid ${variables.gotoGrey}`,
  // boxShadow:
  //   "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",

  "&:active": {
    background: variables.gotoGrey,
  },

  span: {
    fontSize: "1.5rem",
    fontWeight: 500,
    color: variables.gotoBlack,
  },

  a: {
    textDecoration: "none",
    color: variables.gotoWhite,
  },
});

export const pagination = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  height: "48px",
  paddingRight: "1rem",
  marginBlock:'1rem 5rem',

  i: {
    padding: ".5rem",
    border: `1px solid ${variables.gotoGrey}`,
    background: variables.gotoGrey,
    color: variables.gotoBlack,

    "&.disabled": {
      color: variables.gotoGreyDark,
    },
  },

  p: {
    padding: ".25rem 1rem",
    borderBlock: `1px solid ${variables.gotoGrey}`,
    margin: 0,
    minWidth: "20px",
    textAlign: "center",
  },
});

export const listContactItemStyle = css({
  padding: ".25rem 0",
  cursor: "pointer",
  position: "relative",
  overflowX: "hidden",
  textDecoration: "none",
  color: variables.gotoBlack,

  "&.expanded": {
    background: variables.gotoWhite,

    ".card__control": {
      display: "block",
      position: "absolute",
      transform: "translate(0, -50%)",
      background: variables.gotoLight,
      border: `1px solid ${variables.gotoGrey}`,
      padding: "1rem 2rem 1rem .75rem",
      borderRadius: "2rem 0 0 2rem",
      zIndex: 2,
    },
  },

  ".card": {
    paddingLeft: "1rem",
    display: "flex",
    alignItems: "center",

    "&__toggle": {
      position: "absolute",
      right: "0",
      top: "50%",
      transform: "translateY(-50%)",
      color: variables.gotoGreyDark,
      padding: "1rem",
      zIndex: 3,

      "&::before": {
        display: "block",
        transition: "all .5s ease",
        rotate: 0,
      },

      "&.active::before": {
        rotate: "-180deg",
        color: variables.gotoBlack,
      },
    },

    div: {
      display: "grid",
      paddingBlock: "1rem",
      borderBottom: `1px solid ${variables.gotoGrey}`,
      width: "100%",
      position: "relative",
    },

    "&__control": {
      display: "block",
      position: "absolute",
      right: 0,
      top: "50%",
      transform: "translate(100%, -50%)",
      transition: "transform .5s ease",

      i: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        fontSize: 20,
        color: variables.gotoBlack,
      },

      span: {
        position: "relative",
        padding: ".9rem 1.5rem",

        "&:focus i": {
          color: variables.gotoRed,
        },
      },

      "&--delete": {
        color: "red",
      },

      "&--info": {
        color: "blue",
      },

      "&--star.active": {
        i: {
          color: variables.gotoRed,
        },
      },
    },
  },

  "i.fa-user-o": {
    fontSize: "1rem",
    padding: "1rem 1.07125rem",
    background: variables.gotoGreen,
    borderRadius: "50%",
    width: "1rem",
    height: "1rem",
    marginRight: "1rem",
    color: variables.gotoWhite,
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",

    "&::before": {
      display: "flex",
      justifyContent: "center",
    },
  },

  span: {
    fontSize: "14px",
    "&:first-of-type": {
      fontWeight: "600",
      textTransform: "capitalize",
    },
  },
});

export const icon = css({
  fontSize: "1rem",
  padding: "1rem",
  background: variables.gotoGreen,
  borderRadius: "50%",
  width: "1rem",
  height: "1rem",
  color: variables.gotoWhite,
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",

  "&::before": {
    display: "flex",
    justifyContent: "center",
  },
});

export const formInput = css({
  textAlign: "center",
  fontFamily: "Poppins, sans-serif",

  p: {
    textAlign: "start",
    margin: "2rem 0 0 0",
    fontWeight: 600,
  },

  label: {
    display: "flex",
    flexDirection: "column",
    textAlign: "start",
    width: "100%",
    color: variables.gotoBlack,
    fontSize: 14,
    marginBottom: "1rem",

    ">div:not(.has-select)": {
      display: "flex",
      alignItems: "center",
      flexDirection: "row-reverse",

      i: {
        fontSize: "20px",
        padding: "10px",
      },
    },

    input: {
      flex: "1 1 0",
      padding: "0.75rem 0 .5rem 0",
      border: 0,
      borderBottom: `2px solid ${variables.gotoGrey}`,

      fontFamily: "Poppins, sans-serif",
      fontWeight: 500,

      "&.danger": {
        borderColor: variables.gotoRed,
      },

      "&:-moz-placeholder, &::placeholder": {
        color: variables.gotoGreyDark,
      },

      "&:focus-visible": {
        outline: 0,
        borderBottom: `2px solid ${variables.gotoGreen}`,

        "& + i::before": {
          color: variables.gotoGreen,
        },
      },
    },

    ".has-select": {
      display: "flex",
      gap: "1rem",

      ".fa-edit": {
        fontSize: 20,
        alignSelf: "center",
      },

      input: {
        flex: "1 1 0",
      },

      select: {
        fontWeight: 500,
        fontFamily: "Poppins, sans-serif",
        border: 0,
        borderBottom: `2px solid ${variables.gotoGrey}`,
        color: variables.gotoGreyDark,

        "&:focus-visible": {
          outline: 0,
          borderBottom: `2px solid ${variables.gotoGreen}`,
          color: variables.gotoBlack,
        },
      },
    },
  },

  ".form__add": {
    display: "block",
    textAlign: "center",
    flex: "1 1 0",
    padding: "0.5rem 1rem .5rem 1rem",
    marginBottom: "1rem",
    borderRadius: 5,
    border: `1px solid ${variables.gotoGreyDark}`,
    fontFamily: "Poppins, sans-serif",
    fontWeight: 400,
    fontSize: 14,
    color: variables.gotoGreyDark,

    "&:active": {
      color: variables.gotoBlack,
      border: `1px solid ${variables.gotoBlack}`,
    },
  },

  ".buttons": {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",

    a: {
      padding: ".5rem 2rem",
      borderRadius: 5,
      border: 0,
      fontWeight: 600,
      fontSize: 14,
      background: variables.gotoRed,
      color: variables.gotoWhite,
      textDecoration: "none",
    },

    button: {
      padding: ".5rem 2rem",
      borderRadius: 5,
      background: variables.gotoGreen,
      border: 0,
      fontWeight: 600,
      fontSize: 14,
      color: variables.gotoWhite,
    },
  },
});

export const loadingStyle = css({
  "@keyframes spinAround": {
    from: {
      transform: "rotate(0)",
    },
    to: {
      transform: "rotate(359deg)",
    },
  },

  "&:before": {
    content: "' '",
    animation: "spinAround 500ms infinite linear",
    border: `2px solid ${variables.gotoGreyDark}`,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    height: 20,
    width: 20,
    borderRadius: "50%",
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    zIndex: 2,
  },

  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  opacity: "50%",
  background: variables.gotoBlack,
  zIndex: 2,
});

export const loadingDiv = css({
  pointerEvents: "none",
});

export const errorStyle = css({
  padding: ".25rem",
  background: variables.gotoRed,
  color: variables.gotoWhite,
  position: "absolute",
  width: "calc(100% - 2rem)",
  top: "15",
  left: "50%",
  transform: "translateX(-50%)",
  opacity: "1",
  borderRadius: 5,
  fontSize: 14,
});

export const typography = css({
  cursor: "pointer",
  color: variables.gotoGreen,
  textDecoration: "none",

  "&:hover": {
    textDecoration: "underline",
  },
});

export const detailContactStyle = css({
  overflowX: "hidden",
  textAlign: "center",
  color: variables.gotoBlack,
  position: "relative",

  ul: {
    position: "absolute",
    listStyle: "none",
    textAlign: "start",
    background: "white",
    paddingLeft: 0,
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
    right: 0,
    top: "calc(48.15px + 1.5rem)",
    zIndex: 2,
    margin: 0,
    borderRadius: "1rem 0 0rem 1rem",
    transform: "translateX(100%)",
    transition: "all .5s ease",

    li: {
      padding: ".75rem 1rem",
      cursor: "pointer",

      a: {
        textDecoration: "none",
        color: variables.gotoBlack,
      },

      "&:hover": {
        background: variables.gotoWhite,
        borderRadius: "1rem",
      },
    },
  },

  "i.fa-heart": {
    left: 0,
    right: "unset",
    top: "6.5rem",
    padding: ".875rem",
    borderRadius: "0 1rem 1rem 0",

    '&.active':{
      color:variables.gotoRed,
    }
  },

  "> i": {
    cursor: "pointer",
    position: "absolute",
    padding: ".88rem 1.365rem",
    right: 0,
    top: "1.5rem",
    background: "white",
    borderRadius: "1rem 0 0 1rem",
    color: variables.gotoBlack,
    fontSize: 20,
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
    zIndex: 3,
    transition: "all .5s ease",

    "&.expanded": {
      borderRadius: "1rem 0 0 0",
      boxShadow: "none",

      "+ ul": {
        transform: "translateX(0)",
      },
    },
  },

  ".detail__back": {
    position: "absolute",
    color: variables.gotoBlack,
    padding: ".75rem 1.1425rem",
    left: 0,
    top: "1.5rem",
    background: "white",
    borderRadius: "0 1rem 1rem 0",
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
    zIndex: 1,
  },

  ".detail": {
    margin: "-1rem",
    background: variables.gotoGreen,
    textAlign: "center",
    paddingBlock: "2rem 4rem",
    marginBottom: "4rem",
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
    position: "relative",

    h2: {
      margin: 0,
      color: "white",
      fontSize: 22,
    },

    i: {
      background: "white",
      color: variables.gotoGreen,
      position: "absolute",
      width: "3rem",
      height: "3rem",
      bottom: "-40px",
      left: "50%",
      transform: "translateX(-50%)",

      "&:before": {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      },
    },

    "+ p": {
      fontWeight: 600,
      fontSize: 18,
    },

    "&__info > div": {
      display: "grid",
      justifyContent: "start",
      fontWeight: 600,
      fontSize: 14,
      gridTemplateColumns: "1fr",
      textAlign: "start",

      "> div": {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        marginBottom: "1rem",

        p: {
          flex: "1 1 0",
          padding: ".5rem 0",
          margin: ".5rem 0 .5rem 1rem",
          textAlign: "start",
          fontWeight: 400,
          borderBottom: `1px solid ${variables.gotoBlack}`,
          textTransform: "capitalize",
        },

        i: {
          color: variables.gotoBlack,
          fontSize: 20,
        },
      },

      ".detail--has-select": {
        flexDirection: "row",
      },
    },
  },
});

export const editPhoneStyle = css({
  ".has-select": {
    "&.is-disabled": {
      "select, input": {
        cursor: "not-allowed",
        background: "white",
      },
    },
    "select, input": {
      "&:not(:disabled)": {
        color: variables.gotoBlack,
        "&::placeholder,&:-moz-placeholder,&:-ms-input-placeholder": {
          color: variables.gotoBlack,
        },
      },
    },
  },
});

export const footer = css({
  background:variables.gotoGreen,
  color:variables.gotoLight,
  padding:'1rem',
  fontSize:'14px',
  position:'fixed',
  bottom:0,
  width:'calc(100% - 2rem)',
  fontFamily:'Montserrat, sans-serif'
})