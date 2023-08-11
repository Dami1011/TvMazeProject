import axios from "axios"
import {useState, useEffect} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Loader from '../utils/Loader'
import TvCard from '../component/TvCard'

export default function TvShows() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTv = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://api.tvmaze.com/shows");
        console.log(res);

        setData(res.data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTv();
  }, []);
  
  return (
    <>
     {error && <p className="mt-5 text-center">{error.message}</p>}
      {loading ? (
        <Loader/>
      ) : (
    
    <Container className="mt-5 py-3">
            <Row>
              {data.slice(0, 32).map((show) => (
                <Col key={show.id} xs={6} md={4} lg={3}>
                  <TvCard data={show} />
                </Col>
              ))}
            </Row>
          </Container>
  )}
</>
  )
}
