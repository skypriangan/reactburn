import { useState,useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import jwtInterceptor from "../components/shared/jwtInterceptor";
import jwt_decode from "jwt-decode";
import api_url from "../components/shared/config";

const Posts = () => {
  const token= localStorage.getItem("tokens");
  const decode= jwt_decode(token);
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    post_as_admin: false,
    company_id: decode.company_id,
    body: '',
    image: '',
    // Add more fields as needed
  });

  useEffect(() => {
    handleAll();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('post_as_admin', formData.post_as_admin);
    data.append('company_id', formData.company_id);
    data.append('body', formData.body);
    data.append('image', selectedFile);
    // Append more fields as needed
  
    jwtInterceptor
      .post(api_url + "v1/posts", data,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // Handle the response
        handleAll();
      })
      .catch((error) => {
        // Handle the error
      });
  };

    const handleAll = (e) => {; 
    
    jwtInterceptor
      .get(api_url + "v1/posts?page=1&pagesize=20")
      .then((response) => {
        // console.log(response.data.data);
        // setData(JSON.stringify(response.data.data));
        setData(response.data.data);
        // Handle the response
      })
      .catch((error) => {
        // Handle the error
      });
  };
  
  return (
    <>
      <Row xs={1} md={2} className="g-4">
            <Card>
              <Card.Body>
                <Card.Title>create post</Card.Title>
                <div>                 
                <form onSubmit={handleSubmit}>
                  body :
                  <input
                    type="text"
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                  />
                  image :
                  <input
                    type="file"
                    name="image"
                    value={formData.image}
                    onChange={handleFileChange}
                  />
                  {/* Add more input fields as needed */}
                  <button type="submit">Submit</button>
                </form>
                </div>
                
              </Card.Body>
            </Card>
              <div>
                {data.map(({ id, full_name, body, image, created_at }) => (
                <p key={id}>post_id: {id} created_at : {created_at} ,full_name : {full_name} ,body : {body} ,image : {image}</p>
                ))}
          </div>
      </Row>
    </>
  );
};



export default Posts;
