// Header
const Header = (props) => {
  console.log(props)
  return(
    <div>
      <h1>{props.course.name}</h1>
    </div>

  )

}

// Content
const Content = (props) =>{
  console.log('Content props:', props)
  return(
    <div>
      <Part part={props.content.parts[0].name} excercises={props.content.parts[0].excercises}/>
      <Part part={props.content.parts[1].name} excercises={props.content.parts[1].excercises} />
      <Part part={props.content.parts[2].name} excercises={props.content.parts[2].excercises} />
    </div>
  )
}

// Part
const Part = (props) =>{
  console.log('Part props:', props)
  return(
    <div>
      <p>{props.part}: {props.excercises}</p>
    </div>
  )
}

// Total
const Total = (props) =>{
  console.log('Total props:', props)
  return(
    <div>
      <p>Number of excercises: {props.total.parts[0].excercises + props.total.parts[1].excercises + props.total.parts[2].excercises}</p>
    </div>
  )
}

// App
const App = () => {

  // JavaScript-olio
  const course ={
    name: 'Half Stack application development',
    parts: [{
      name: 'Fundementals of React',
      excercises: 10
    },
    {
      name: 'Using props to pass data',
      excercises: 7
    },
    {
      name: 'State of a component',
      excercises: 14
    }
  ]
}

  return (
    <div>
      <Header course={course}/>
      <Content content={course}/>
      <Total total={course} />
    </div>
  )
}


export default App
