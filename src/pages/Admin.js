
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import jwt_decode from "jwt-decode";
import api_url from "../components/shared/config";

const Admin = () => {
  const token= localStorage.getItem("tokens");
  const decode= jwt_decode(token);
  const path_image= "public/img";
  const image =api_url + path_image + '/' + decode.avatar
  // console.log(decode)
  
  return (
    <>
      <Row xs={1} md={2} className="g-4">
            <Card>
              <Card.Body>
                <Card.Title>jwt decode token</Card.Title>
                <Card.Text>id           : {decode.id}</Card.Text>
                <Card.Text>email        : {decode.email}        </Card.Text>
                <Card.Text>full_name    : {decode.full_name}    </Card.Text>
                <Card.Text>user_profiles: {String(decode.user_profiles)}</Card.Text>
                <Card.Text>role         : {decode.role}       </Card.Text>
                <Card.Text>avatar       : {decode.avatar}       </Card.Text>
                <Card.Text>company_id   : {decode.company_id}   </Card.Text>
                <Card.Text>company      : {decode.company}      </Card.Text>                
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>avatar</Card.Title>
                <Card.Text> <img src={image} alt="Avatar" /> {decode.avatar} </Card.Text>
              </Card.Body>
            </Card>
      </Row>
    </>
  );
};

export default Admin;
