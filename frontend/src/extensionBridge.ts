import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export function initExtensionBridge() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.postMessage(
        {
          type: "MADMAX_UID",
          uid: user.uid
        },
        "*"
      );
    }
  });
}