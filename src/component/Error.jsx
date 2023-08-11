import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  return (
    <div className="text-center mt-5">
      <h1>Error please go home</h1>
      <Button onClick={() => navigate("/")}>GO TO HOME</Button>
    </div>
  );
}
