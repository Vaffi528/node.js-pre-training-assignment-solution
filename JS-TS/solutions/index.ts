import { ToDoManager } from "./todo-manager";
import { TodoStatus } from "./types";

export class CLI {
    private manager = new ToDoManager;

    async exec(args: string[] = process.argv.slice(2)): Promise<void> {
        const command = args[0];

        if (!command) return;

        await this.manager.init();

        switch (command) {
            case 'add':
                await this.addFunc(args[1], args[2]);
                break;
            case 'complete':
                await this.completeFunc(args[1]);
                break;
            case 'list':
                await this.listFunc();
                break;
            default:
                throw new Error("exec: Invalid command");
        }
    }

    async addFunc(title: string, description: string): Promise<void> {
        if (!title) throw new Error("addFunc: Invalid argument");
                
        if (description) {
            await this.manager.add(title, description);
        } else {
            await this.manager.add(title);
        }

        console.log(`Todo is successfully added: ${title}, ${description ?? "(no description)"}`);
    }

    async completeFunc(id: string): Promise<void> {
        if (!id) throw new Error("completeFunc: Invalid argument");
        
        const idInt = parseInt(id);
        if (isNaN(idInt)) 
            throw new Error("completeFunc: Invalid id: must be number");

        await this.manager.complete(idInt);

        console.log(`Status of todo with id ${id} is successfully toggled`);
    }

    async listFunc(): Promise<void> {
        const todos = await this.manager.list();
        
        if (todos.length == 0) 
            console.log("List of todos is empty");

        todos.forEach(element => {
            let statusAsStirng: string;
            if (element.status == TodoStatus.COMPLETED)
                statusAsStirng = 'completed';
            else if (element.status == TodoStatus.PENDING)
                statusAsStirng = 'pending';
            else
                statusAsStirng = 'in progress';
            console.log(`Todo: ${element.id}, ${element.title}, ${element.createdAt.toString()}, ${statusAsStirng}, ${element.description ?? "-"}`);
        });
    }
}


const cli = new CLI();
cli.exec().catch((err) => console.log(`${err.message}`));