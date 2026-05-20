import useToastStore from "../store/toastStore";

export default function Toast() {
  const message = useToastStore((state) => state.message);

  if (!message) return null;

  return <div>{message}</div>;
}
