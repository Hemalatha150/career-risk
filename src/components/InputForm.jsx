import { useState } from "react";
import axios from "axios";
import { roleSkills } from "./data";

export default function InputForm({setResult}){

const [loading,setLoading]=useState(false);

const [form,setForm]=useState({
role:"",
skills:"",
years_experience:1
});

const [roleInput,setRoleInput]=useState("");
const [roleSuggestions,setRoleSuggestions]=useState([]);

const [skillInput,setSkillInput]=useState("");
const [skillSuggestions,setSkillSuggestions]=useState([]);



/* ================= ROLE SEARCH ================= */

const handleRoleChange=(e)=>{
const value=e.target.value;
setRoleInput(value);

const roles=Object.keys(roleSkills);

setRoleSuggestions(
roles.filter(r =>
r.toLowerCase().includes(value.toLowerCase())
)
);
};



/* ================= SKILL SEARCH ================= */

const handleSkillChange=(e)=>{
  const value=e.target.value;
  setSkillInput(value);

  const skills=roleSkills[form.role] || [];

  const parts=value.split(",");
  const lastWord=parts[parts.length-1].trim().toLowerCase();

  if(!lastWord){
    setSkillSuggestions([]);
    return;
  }

  const filtered=skills.filter(skill =>
    skill.toLowerCase().includes(lastWord)
  );

  setSkillSuggestions(filtered);
};



/* ================= SUBMIT ================= */

const handleSubmit=async(e)=>{
e.preventDefault();

setLoading(true);
setResult(null);

let level="junior";

if(form.years_experience>=5)
level="senior";
else if(form.years_experience>=2)
level="mid";

const payload={
...form,
experience_level:level
};

try{
const res=await axios.post(
"http://127.0.0.1:8000/predict",
payload
);

setTimeout(()=>{
setResult(res.data);
setLoading(false);
},900);

}catch(err){
console.error(err);
setLoading(false);
}
};


/* ================= STYLES ================= */

const card={
background:"rgba(255,255,255,0.9)",
padding:"35px",
borderRadius:"16px",
width:"420px",
boxShadow:"0 15px 40px rgba(0,0,0,0.2)"
};

const input={
  width:"100%",
  padding:"12px",
  marginBottom:"15px",
  borderRadius:"8px",
  border:"1px solid #ddd",
  outline:"none"
};

const button={
width:"100%",
padding:"14px",
borderRadius:"8px",
border:"none",
background:
"linear-gradient(90deg,#2563eb,#06b6d4,#22c55e)",
color:"white",
fontWeight:"bold",
display:"flex",
justifyContent:"center",
alignItems:"center",
gap:"10px"
};

return(
<>
<style>
{`
@keyframes spin{
0%{transform:rotate(0)}
100%{transform:rotate(360deg)}
}
`}
</style>

<form style={card} onSubmit={handleSubmit}>

<h2 style={{textAlign:"center"}}>
Career Risk Radar
</h2>


{/* ROLE INPUT */}

<div style={{position:"relative"}}>

<input
style={input}
placeholder="Type Role"
value={roleInput}
onChange={handleRoleChange}
/>

{roleSuggestions.length > 0 && roleInput && (
  <div style={{
    position:"absolute",
    top:"42px",
    left:0,
    right:0,
    background:"rgba(255,255,255,0.95)",
    borderRadius:"8px",
    border:"1px solid #ddd",
    maxHeight:"120px",
    overflowY:"auto",
    zIndex:10
  }}>
    {roleSuggestions.slice(0,5).map(role=>(
  <div
    key={role}
    style={{
      padding:"8px 12px",
      fontSize:"14px",
      color:"#555",
      cursor:"pointer"
    }}
    onClick={()=>{
      setForm({...form,role});
      setRoleInput(role.replace(/([A-Z])/g, " $1").trim());
      setRoleSuggestions([]);
    }}
  >
    {role.replace(/([A-Z])/g, " $1").trim()}
  </div>
))}
  </div>

)}

</div>



{/* SKILLS INPUT */}

<div style={{position:"relative"}}>

<input
style={input}
placeholder="Type Skills"
value={skillInput}
onChange={handleSkillChange}
/>

{skillSuggestions.length > 0 && skillInput && (
  <div style={{
    position:"absolute",
    top:"42px",
    left:0,
    right:0,
    background:"rgba(255,255,255,0.95)",
    borderRadius:"8px",
    border:"1px solid #ddd",
    maxHeight:"120px",
    overflowY:"auto",
    zIndex:10
  }}>
    {skillSuggestions.slice(0,5).map(skill=>(
      <div
        key={skill}
        style={{
          padding:"8px 12px",
          fontSize:"14px",
          color:"#666",
          cursor:"pointer"
        }}
        onClick={()=>{
  const parts=skillInput.split(",");
  parts[parts.length-1]=` ${skill}`;
  const updated=parts.join(",").replace(/^ /,"");

  setSkillInput(updated);
  setForm({...form,skills:updated});
  setSkillSuggestions([]);
}}
      >
        {skill}
      </div>
    ))}
  </div>

)}

</div>



<input
style={input}
type="number"
placeholder="Years Experience"
onChange={(e)=>
setForm({
...form,
years_experience:e.target.value
})
}
/>


<button style={button} disabled={loading}>

{loading?(
<>
<div style={{
width:"18px",
height:"18px",
border:"3px solid white",
borderTop:"3px solid transparent",
borderRadius:"50%",
animation:"spin 1s linear infinite"
}}/>

Predicting Risk...
</>
):
"Predict Risk"
}

</button>

</form>
</>
);
}