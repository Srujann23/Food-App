import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
// import Carousel from '../components/Carousel'




export default function Home() {

  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://192.168.1.4:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0],response[1]);
  }


  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      {/* <div><Carousel /></div> */}
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://foodish-api.com/images/pizza/pizza43.jpg" className="d-block w-100" alt="Pizza" style={{ height: '500px', width: '100px', filter: "brightness(30%)" }} />
            </div>
            <div className="carousel-item">
              <img src="https://foodish-api.com/images/burger/burger17.jpg" className="d-block w-100" alt="Burger" style={{ height: '500px', width: '100px', filter: "brightness(30%)" }} />
            </div>
            <div className="carousel-item">
              <img src="https://foodish-api.com/images/pasta/pasta21.jpg" className="d-block w-100" alt="Pasta" style={{ height: '500px', width: '100px', filter: "brightness(30%)" }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {
          foodCat.length > 0
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                  <hr />
                  {foodItem.length > 0
                    ? foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                      .map(filterItems => {
                        return (
                          <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                            <Card foodItem={filterItems}
                            options={filterItems.options[0]}
                              > </Card>

                          </div>
                        )
                      })
                    : <div>No such Data Found</div>}
                </div>
              )
            }) : <div>Loading categories...</div>
        }
      </div>
    </div>
  )
}
