import Toast from "react-native-toast-message";

export const alert = {
  success: (message: string, delay?: number) => {
    const show = () => Toast.show({
      type: "success",
      text1: "¡Hecho!",
      text2: message,
    });
    delay ? setTimeout(show, delay) : show();
  },

  error: (message: string, delay?: number) => {
    const show = () => Toast.show({
      type: "error",
      text1: "Error",
      text2: message,
    });
    delay ? setTimeout(show,delay) : show();
  },
};