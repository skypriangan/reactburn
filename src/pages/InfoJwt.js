import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
// import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import jwt_decode from "jwt-decode";
import jwtInterceptor from "../components/shared/jwtInterceptor";
import api_url from "../components/shared/config";

const InfoJwt = () => {
  const token= localStorage.getItem("tokens");
  const decode= jwt_decode(token);
  const path_image= "public/img";
  const image =api_url + path_image + '/' + decode.avatar
  // console.log(decode)

  const [data, setData] = useState({});
  useEffect(() => {
    jwtInterceptor
      .get(api_url + "v1/apitestauth")
      .then((response) => {
        // console.log(response.data)
        setData(response.data);
        // console.log(jwt_decode(response.data.token));
      });
  }, []);
  
  return (
    <>
      <Row xs={1} md={2} className="g-4">
            <Card>
              <Card.Body>
                <Card.Title>jwt decode token</Card.Title>
                <div>                 
                  <table>
                  	<tbody>
                  		<tr>
                  			<td>id</td>
                  			<td align="center">:</td>
                  			<td>{decode.id}</td>
                  		</tr>
                  		<tr>
                  			<td>email</td>
                  			<td align="center">:</td>
                  			<td>{decode.email}</td>
                  		</tr>
                  		<tr>
                  			<td>full_name</td>
                  			<td align="center">:</td>
                  			<td>{decode.full_name}</td>
                  		</tr>
                  		<tr>
                  			<td>user_profiles</td>
                  			<td align="center">:</td>
                  			<td>{String(decode.user_profiles)}</td>
                  		</tr>
                  		<tr>
                  			<td>role</td>
                  			<td align="center">:</td>
                  			<td>{decode.role}</td>
                  		</tr>
                  		<tr>
                  			<td>avatar</td>
                  			<td align="center">:</td>
                  			<td>{decode.avatar}</td>
                  		</tr>
                  		<tr>
                  			<td>company_id</td>
                  			<td align="center">:</td>
                  			<td>{decode.company_id}</td>
                  		</tr>
                  		<tr>
                  			<td>company</td>
                  			<td align="center">:</td>
                  			<td>{decode.company}</td>
                  		</tr>
                  	</tbody>
                  </table>
                </div>
                
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>avatar</Card.Title>
                <Card.Text> <img src={image} alt="Avatar" /> {decode.avatar} </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Hit API</Card.Title>
                <Card.Text>token        : {data.token}         </Card.Text>
              </Card.Body>
            </Card>
      </Row>
    </>
  );
};



export default InfoJwt;
