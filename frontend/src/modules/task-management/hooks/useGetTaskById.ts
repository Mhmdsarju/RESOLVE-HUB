import { useQuery } from "@tanstack/react-query";

import { getTaskById } from "../api/taskApi";

import type { Task } from "../types/task.types";

export function useGetTaskById(id:string){
    return  useQuery<Task>({
        queryKey:["task",id],
        queryFn:()=> getTaskById(id),
        enabled:Boolean(id),
    })
}