import React from 'react'

export default function Card() {
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src="https://media.istockphoto.com/id/184946701/photo/pizza.jpg?s=2048x2048&w=is&k=20&c=8OBQa24pfg30tPlnhq4fCzhdaNlcHn-vRDpTHo4H3bA=" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title-a12</h5>
                        <p className="card-text">Some quick example text.</p>
                        <div className="container w-100">
                            
                            <select className='m-2 h-100 bg-success rounded'>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    );
                                })}
                            </select>

                            <select className='m-2 h-100 w-10 bg-success rounded'>
                                <option value="half">Half</option>
                                <option value="full">Full</option>
                            </select>

                            <div className="d-inlin h-100 fs-5">Total Price</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
