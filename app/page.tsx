export default function Home() {
  return (
    <main style={{padding:"40px",fontFamily:"Arial"}}>
      
      <h1>RockAutoTec</h1>
      <p>Find exact auto parts for your vehicle</p>

      <h2>Search By Vehicle</h2>

      <input placeholder="Year (e.g. 2018)" style={{padding:"10px",margin:"10px"}}/>
      <input placeholder="Make (e.g. Toyota)" style={{padding:"10px",margin:"10px"}}/>
      <input placeholder="Model (e.g. Camry)" style={{padding:"10px",margin:"10px"}}/>

      <br/>

      <button style={{padding:"10px 20px",marginTop:"10px"}}>
        Search Parts
      </button>

      <h3 style={{marginTop:"40px"}}>Popular Categories</h3>

      <ul>
        <li>Engine Parts</li>
        <li>Brake System</li>
        <li>Suspension</li>
        <li>Cooling System</li>
        <li>Electrical</li>
      </ul>

    </main>
  )
}