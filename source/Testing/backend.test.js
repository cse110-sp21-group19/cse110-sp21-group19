/**
 * @jest-environment jsdom
 */
require("fake-indexeddb/auto");
const funcs = require("../Backend/api/bullet_api.js");
const entryFunc = require("../Backend/api/entries_api.js");

describe("Bullet Database Tests", () => {
    beforeAll(async () => {
        funcs.createDB();
    });

    test("Add 2 bullet entries and check first", async () => {
        let exampleBullet = {
            "log": "daily",
            "date": new Date(2021, 1, 4),
            "priority": true,
            "content": "example",
            "completed": false,
            "type": "note",
            "children": []
        };
        let exampleBullet2 = {
            "log": "monthly",
            "date": new Date(2021, 1, 4),
            "priority": true,
            "content": "example",
            "completed": false,
            "type": "note",
            "children": []
        };
        
        await funcs.createBullet(exampleBullet);
        await funcs.createBullet(exampleBullet2);
        let data = await funcs.getBullet(1);
        expect(data.log).toBe("daily");
    });

    test("Update Bullet entry", async () => {  
        await funcs.updateBullet(1, {
            "log": "daily",
            "date": new Date(2021, 1, 4),
            "priority": true,
            "content": "test",
            "completed": false,
            "type": "note",
            "children": []
        });
        let data = await funcs.getBullet(1);
        expect(data.content).toBe("test");
    });

    test("Delete Bullet entry", async () => {
        await funcs.deleteBullet(2);
        let data = await funcs.getBullet(2);
        expect(data).toBeUndefined();
    });

    test("Add 10 Bullet entries of same date and getDailyBullets", async () => {
        let exampleBullet = {
            "log": "daily",
            "date": new Date(2021, 1, 5),
            "priority": true,
            "content": "example",
            "completed": false,
            "type": "note",
            "children": []
        };
        let i;
        for(i = 0; i < 10; i++) {
            await funcs.createBullet(exampleBullet);
        }

        let arr = await funcs.getDailyBullets(new Date(2021, 1, 5));
        expect(arr[0].length).toBe(10);
    });

    test("Checking if previous 10 bullets can be gathered by priority", async () => {
        let arr = await funcs.getDailyPriority(new Date(2021, 1, 5));
        expect(arr.length).toBe(10);
    });

    test("Add 5 entries of same date and getDailyBullets", async () => {
        let exampleBullet = {
            "log": "daily",
            "date": new Date(2021, 1, 6),
            "priority": true,
            "content": "example",
            "completed": false,
            "type": "task",
            "children": []
        };
        let i;
        for(i = 0; i < 5; i++) {
            await funcs.createBullet(exampleBullet);
        }

        let arr = await funcs.getDailyTodo(new Date(2021, 1, 6));
        expect(arr.length).toBe(5);
    });

    test("Getting all Bullets with priority (should be 16)", async () => {
        let arr = await funcs.getAllPriority();
        expect(arr.length).toBe(16);
    });
});

describe("Entry Database Test", () => {
    test("Add 2 entries and check first", async () => {
        let testEntry1 = {
            "date": new Date(2021, 1, 4),
            "title": "title",
            "content": "entry 1"
        };
        let testEntry2 = {
            "date": new Date(2021, 1, 4),
            "title": "title",
            "content": "entry 2"
        };
        
        await entryFunc.createEntry(testEntry1);
        await entryFunc.createEntry(testEntry2);
        let data = await entryFunc.getEntry(1);
        expect(data.content).toBe("entry 1");
    });

    test("Update Entry", async () => {  
        await entryFunc.updateEntry(1, {
            "date": new Date(2021, 1, 4),
            "title": "title",
            "content": "new entry"
        });
        let data = await entryFunc.getEntry(1);
        expect(data.content).toBe("new entry");
    });

    test("Delete Entry", async () => {
        await entryFunc.deleteEntry(2);
        let data = await entryFunc.getEntry(2);
        expect(data).toBeUndefined();
    });

    test("Add 10 Entries of same date and getDailyEntries", async () => {
        let testEntry = {
            "date": new Date(2021, 1, 9),
            "title": "title",
            "content": "entry 1"
        };

        let i;
        for(i = 0; i < 10; i++) {
            await entryFunc.createEntry(testEntry);
        }

        let arr = await entryFunc.getDailyEntries(new Date(2021, 1, 9));
        expect(arr[0].length).toBe(10);
    });
});