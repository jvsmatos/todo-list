import {Card, CardContent, CardDescription, CardHeader, CardTitle} from './components/ui/card.jsx';
import { Label } from './components/ui/label.jsx';
import { Input } from './components/ui/input.jsx';
import { Checkbox } from './components/ui/checkbox.jsx';
import { Button } from './components/ui/button.jsx';
import { Separator } from './components/ui/separator.jsx';
import { Trash2, CirclePlus } from 'lucide-react';

import { useState } from 'react';

export function App() {
  const [newTask, setNewTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  function handleAddTask(newTask){
    if(newTask === '') return;

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

  function handleClick(id){
    setTaskList(prevList => 
      prevList.map(task => task.id === id ? {...task, checked: !task.checked} : task
      )
    );
  }

  function handleDelete(id){
    setTaskList(prevList => 
      prevList.filter(task => task.id !== id)
    );
  }

  return (
    <main className="bg-zinc-800 h-screen flex justify-center">
        <Card className="mx-10 my-auto w-full">
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
              placeholder="Insert your new task here" />
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
                {taskList.map(task => 
                <li key={task.id} className='border-b-1 py-2 border-gray-800 flex'>
                  <div className='flex w-full gap-2 *:cursor-pointer'>
                    <Checkbox 
                    id={`task-${task.id}`} 
                    onClick={() => handleClick(task.id)} 
                    checked={task.checked} />
                    <Label 
                    htmlFor={`task-${task.id}`} 
                    className={task.checked ? 'line-through text-gray-500' : ''}>
                    {task.desc}
                    </Label>
                  </div>
                  <Trash2 
                  onClick={() => handleDelete(task.id)} 
                  className='cursor-pointer fill-transparent hover:fill-red-600 transition-colors delay-100 duration-300 ease-in-out' 
                  size={18}  />
                </li>
                )}
              </ul>
              )}
            </div>
          </CardContent>

        </Card>
    </main>
  )
}
