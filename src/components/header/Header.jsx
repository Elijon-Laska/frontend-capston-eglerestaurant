import { Button, Card } from "react-bootstrap";
import logo from "../../../src/assets/egle-logo-1.PNG";
import "./header.css";
import { SendArrowUpFill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { showPrenotazioneModal } from "../../redux/actions";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <Card className=" header-card-img bg-transparent text-color-custom * text-center  ">
      <Card.Img variant="top" src={logo} />
      <Card.Body>
        <Card.Title>
          E G L E <br /> amore e cucina
        </Card.Title>
        <Card.Text>
          Un ristorante dove l'amore incontra la cucina, e ogni ingrediente ha il suo momento di gloria.
        </Card.Text>
        <Button variant="outline-success" onClick={() => dispatch(showPrenotazioneModal())}>
          Prenota <SendArrowUpFill className="ms-2" />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Header;
