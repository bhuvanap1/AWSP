export interface User {
    firstName: string;
    lastName: string;
    handle: string;
    password: string;
    email: string;
    picture: string;
    id: number;
    userTasks : any;
}

export const list: User[] = [
    {
        id: 1,
        handle: 'Sai',
        firstName: 'Sai',
        lastName: 'Papineni',
        password: 'Papineni',
        email: 'saipapineni@gmail.com',
        picture: 'https://randomuser.me/api/portraits/lego/8.jpg',
        userTasks: [
            {task : 'Update Vue',dueDate:'2022-05-22', isCompleted: true, assignedBy: "Balu"},
            {task : 'Complete Midterm',dueDate:'2022-08-14', isCompleted: false, assignedBy: "Chandu"},
            {task : 'Attend to seminar',dueDate:'2022-07-03', isCompleted: true, assignedBy: "Balu"}
        ]
    },
    {
        id: 2,
        handle: 'Balu',
        firstName: 'Bala',
        lastName: 'Shankar',
        password: 'Malladi',
        email: 'BSM@gmail.com',
        picture: 'https://randomuser.me/api/portraits/lego/12.jpg',
        userTasks: [
            {task : 'Review the code',dueDate:'2022-03-15', isCompleted: false, assignedBy: "Sai"},
            {task : 'Prepare the final project',dueDate:'2022-10-15', isCompleted: false, assignedBy: "Chandu"}
        ]
    },
    {
        id: 3,
        handle: 'Chandu',
        firstName: 'Chandra Sekhar',
        lastName: 'Marachu',
        password: 'Devil',
        email: 'devil123@gmail.com',
        picture: 'https://randomuser.me/api/portraits/lego/2.jpg',
        userTasks: [
            {task : 'Create a Login page',dueDate:'2022-06-22', isCompleted: false, assignedBy: "Balu"},
            {task : 'Reminder for submission',dueDate:'2022-03-22', isCompleted: false, assignedBy: "Sai"}
        ]
    }
]