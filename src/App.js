import React from "react";
import List from "./data";
import "./App.css";
import { ReactComponent as DragHandleIcon } from "./open_with-black-18dp.svg";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const App = () => {
  const list = List.getList();
  return (
    <div className="App">
      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination?.index;
          if (desI) {
            list.splice(desI, 0, list.splice(srcI, 1)[0]);
            List.saveList(list);
          }
        }}
      >
        <div className="ListContainer">
          <h2>MATHEMATICS</h2>
          <div className="titleBox">
            <div className="left">
              <h4>Actions</h4>
              <span>Move, Indent, Outdent, Delete</span>
            </div>
            <div className="right">
              <h4>Standard</h4>
              <span>The text of the standard</span>
            </div>
          </div>
          <Droppable droppableId="droppable-1">
            {(provided, _) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {list.map((item, i) => (
                  <Draggable
                    key={item.id}
                    draggableId={"draggable-" + item.id}
                    index={i}
                  >
                    {(provided, snapshot) => (
                      <div 
                        className="ListItem"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        
                      >
                        <div className="actionIcons">
                          <div 
                            className="DragIconWrapper" 
                            {...provided.dragHandleProps}>
                            <DragHandleIcon />
                          </div>
                          <button
                            onClick={()=>{
                              if(item.indent>0){
                                const list = List.getList();
                                list[i].indent--;
                                List.saveList(list);
                                window.location.reload();
                              }                                
                            }}
                          ><img src={require("./arrow_back-black-18dp.svg")}></img></button>
                          <button
                            onClick={()=>{
                              if(item.indent<2){
                                const list = List.getList();
                                list[i].indent++;
                                List.saveList(list);
                                window.location.reload();
                              }                                
                            }}
                          ><img src={require("./arrow_forward-black-18dp.svg")}></img></button>
                          <button 
                            onClick={() => {
                              const list = List.getList();
                              list.splice(i,1);
                              List.saveList(list);
                              window.location.reload();
                              
                            }}
                          ><img src={require("./delete-black-18dp.svg")}></img></button>
                        </div>
                        <div className="grey" style={{marginLeft: item.indent+"rem"}}></div>
                        <input
                          className="textBox"
                          name="title"
                          id="textBox"
                          type="text"
                          
                          onBlur={(event)=>{
                            const list = List.getList();
                            list[event.target.name]=event.target.value;
                            List.saveList(list);
                          }}
                          value={item.title}
                          style={{color:item.indent==0?"#337ab7":"null", 
                                  fontWeight:item.indent<2?"bold":"null",
                                  fontSize:item.indent==0?"1rem":".9rem"}}
                        >
                        </input>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <button 
            className="add"
            onClick={() => {
              const list = List.getList();
              list.push({id:list.length+1,indent:0,title:"dummy"});
              List.saveList(list);
              window.location.reload()
            }}
          >
            <img src={require("./add_circle_outline-white-18dp.svg")}></img>
            <h3>Add a standard</h3>
          </button>
        </div>
      </DragDropContext>
    </div>
  );
};


export default App;