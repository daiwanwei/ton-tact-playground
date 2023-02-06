import { toNano ,Contract,Address} from "ton";
import { ContractSystem,Treasure } from "ton-emulator";
import { Counter } from "../sources/output/sample_Counter";

describe("counter contract test", () => {
    it("should deploy correctly", async () => {
        // Create ContractSystem and deploy contract
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        let user1 = system.treasure("user1");
        let contract = system.open(await Counter.fromInit(owner.address));
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await system.run();
        // Check counter
        expect(await contract.getCounter()).toEqual(0n);

        // // Increment counter
        // await contract.send(owner, { value: toNano(1) }, "increment");
        // await system.run();
        // expect(track.events()).toMatchInlineSnapshot(`
        //     [
        //       {
        //         "message": {
        //           "body": {
        //             "text": "increment",
        //             "type": "text",
        //           },
        //           "bounce": true,
        //           "from": "kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P",
        //           "to": "kQCY8hRET2P9ghS3wLorMDazt37aCxg5cGcV0t0rYodDbYFu",
        //           "type": "internal",
        //           "value": 1000000000n,
        //         },
        //         "type": "received",
        //       },
        //       {
        //         "gasUsed": 4669n,
        //         "type": "processed",
        //       },
        //     ]
        // `);

        // // Check counter
        // expect(await contract.getCounter()).toEqual(1n);

        // // Non-owner
        // await contract.send(nonOwner, { value: toNano(1) }, "increment");
        // await system.run();
        // expect(track.events()).toMatchInlineSnapshot(`
        //     [
        //       {
        //         "message": {
        //           "body": {
        //             "text": "increment",
        //             "type": "text",
        //           },
        //           "bounce": true,
        //           "from": "kQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcCWH",
        //           "to": "kQCY8hRET2P9ghS3wLorMDazt37aCxg5cGcV0t0rYodDbYFu",
        //           "type": "internal",
        //           "value": 1000000000n,
        //         },
        //         "type": "received",
        //       },
        //       {
        //         "errorCode": 4429,
        //         "type": "failed",
        //       },
        //       {
        //         "message": {
        //           "body": {
        //             "type": "empty",
        //           },
        //           "bounce": false,
        //           "from": "kQCY8hRET2P9ghS3wLorMDazt37aCxg5cGcV0t0rYodDbYFu",
        //           "to": "kQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcCWH",
        //           "type": "internal",
        //           "value": 995047000n,
        //         },
        //         "type": "sent-bounced",
        //       },
        //     ]
        // `);
    });

    describe("check contract function",()=>{
        let system:ContractSystem;
        let owner:Treasure;
        let user1:Treasure;
        let contractAddress:Address;

        beforeAll(async ()=>{
            system = await ContractSystem.create();
            owner = system.treasure("owner");
            user1 = system.treasure("user1");
            let contract = system.open(await Counter.fromInit(owner.address));
            await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
            await system.run();
            contractAddress=contract.address
        })

        it("should receive increment message successfully",async ()=>{
            // Increment counter
            const contract=system.open(Counter.fromAddress(contractAddress))
            const count=await contract.getCounter()
            await contract.send(owner, { value: toNano(1) }, "increment");
            await system.run();
            // Check counter
            expect(await contract.getCounter()).toEqual(count+1n);
        })

        it("should receive Add message successfully",async ()=>{
            // Increment counter
            const contract=system.open(Counter.fromAddress(contractAddress))
            const count=await contract.getCounter()
            await contract.send(owner, { value: toNano(1) }, {$$type: 'Add',amount: 1n});
            await system.run();
            // Check counter
            expect(await contract.getCounter()).toEqual(count+1n);
        })
    })
});
