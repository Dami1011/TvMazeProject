import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Loader from '../utils/Loader'
import TvCard from "../component/TvCard";
import {useNavigate} from 'react-router-dom'

export default function Search() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const query = new URLSearchParams(location.search);
  const queryParams = query.get("q");
  const navigate = useNavigate()

  useEffect(() => {
    const getSearch = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${queryParams}`
        );
        setData(res.data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }, 600);
    return () => clearTimeout(getSearch);
  }, [queryParams]);

  useEffect(()=> {
    const params = new URLSearchParams()
    if(queryParams) {
      params.append('q', queryParams)
    } else {
      params.delete('q')
    } 
    navigate({search: params.toString()})
  }, [navigate, queryParams])

  console.log(data);

  return (
    <Container className="py-4 px-3">
      {error && <p>{error.message}</p>}
      {loading ? <Loader/> : 
      <>
      {data.length > 0 ? (
        <>
        <p>{data.length} results found for {queryParams}</p>
        <Row>
          {data.map((item)=> (
            <Col key={item.id} xs={6} md={4} xl={3}> 
            <TvCard data={item.show}/>
            </Col>
            ))}
        </Row>
        </>
      ):(
        <p>No result found for{queryParams}</p>
      ) }
      </>
      }
    </Container>
  );
}
