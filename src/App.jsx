import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from './components/ui/card.jsx';
import { Input } from './components/ui/input.jsx';
import { Button } from './components/ui/button.jsx';
import { Separator } from './components/ui/separator.jsx';
import { CirclePlus } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import Tasks from './components/Tasks.jsx';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';


import { useState, useEffect } from 'react';

export function App() {
  const [newTask, setNewTask] = useState('');
  const [taskList, setTaskList] = useState(() => {
    const localStoredTasks = localStorage.getItem('storedTaskList');
    return localStoredTasks ? JSON.parse(localStoredTasks) : [];
  });

  function handleAddTask(newTask){
    if(newTask === '') return;

    toast.success('New task added');

    setTaskList(prevList => [
      {
        id: Date.now(),
        desc: newTask,
        checked: false
      }, ...prevList
    ]);

    setNewTask('');
  }

  function handleNewTask(event){
    setNewTask(event.target.value);
  }

  function handleClick(id, ){
    setTaskList(prevList => 
      prevList.map(task => task.id === id ? {...task, checked: !task.checked} : task
      )
    );
  }

  function handleDelete(id){
    setTaskList(prevList => 
      prevList.filter(task => task.id !== id)
    );

    toast.success('Task deleted');
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleAddTask(newTask);
    }
  }

  function handleDragEnd(event) {
    const { active, over } = event;
  
    if (active.id !== over.id) {
      setTaskList((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  } 

  useEffect(() => {
    localStorage.setItem('storedTaskList', JSON.stringify(taskList));
  }, [taskList]);

  return (
    <main className="mx-8 my-8 flex justify-center">
        <Toaster />
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              To-Do List
            </CardTitle>
            <CardDescription className="text-center">
              Add itens to your personal checklist.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col">
            <div className='flex gap-3'>
              <Input 
              type="text" 
              onChange={handleNewTask} 
              value={newTask} 
              placeholder="Insert your new task here" 
              onKeyDown={handleKeyDown}/>
              <Button onClick={() => handleAddTask(newTask)}>
                <CirclePlus /> Add
              </Button>
            </div>

            <Separator className="my-4" />

            <div>
              {taskList.length === 0 ? (
                <p className='text-center'>No tasks found</p>
              ) : (
              <ul>
                <DndContext 
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd} >
                <SortableContext
                  items={taskList}
                  strategy={verticalListSortingStrategy}>
                {taskList.map(task => 
                  <Tasks
                    key={task.id}
                    id={task.id}
                    task={task}
                    handleClick={handleClick}
                    handleDelete={handleDelete}
                  />
                )}
                </SortableContext>
                </DndContext>
              </ul>
              )}
            </div>
          </CardContent>
          <CardFooter className="text-gray-600 text-xs flex flex-col items-start">
            <p>v1.0 - add, list, delete tasks / check-uncheck tasks / localstorage for temporary usage;</p>
            <p>v1.1 - submit task using 'Enter' / toast msgs (add/del) / drag-and-drop support to reorder items;</p>
          </CardFooter>
        </Card>
    </main>
  )
}
