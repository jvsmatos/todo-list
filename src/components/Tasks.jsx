import { Trash2, Grip } from 'lucide-react';
import { Checkbox } from './ui/checkbox.jsx';
import { Label } from './ui/label.jsx';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function Tasks({ id, task, handleClick, handleDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
        handle: '.drag-handle',
    });
    const style = {
        transform: transform ? CSS.Translate.toString(transform) : 'none',
        transition,
    };
  
    return (
      <li ref={setNodeRef} style={style} className='bg-gray-200 rounded-md my-2 py-3 px-3 hover:bg-gray-300 border-gray-800 flex'>
        <div className='flex w-full gap-2 *:cursor-pointer'>
          <Checkbox
            className='border-2 border-zinc-400'
            id={`task-${task.id}`}
            onClick={() => handleClick(task.id)}
            checked={task.checked}
          />
          <Label
            htmlFor={`task-${task.id}`}
            className={task.checked ? 'line-through text-gray-500' : ''}
          >
            {task.desc}
          </Label>
        </div>
        <Grip {...attributes} {...listeners} className='cursor-pointer mx-4 drag-handle' size={18} />
        <Trash2
          onClick={() => handleDelete(task.id)}
          className='cursor-pointer fill-transparent hover:fill-red-600 transition-colors delay-100 duration-300 ease-in-out'
          size={18}
        />
      </li>
    );
}
  