import { Client, type SetActivity } from "@xhayper/discord-rpc";
import axios from "axios";
@
let rpcClient: Client | null = null;
export const getClient = async () => {
	const isAvailable = rpcClient && rpcClient.transport.isConnected && rpcClient.user;
	if (isAvailable) return rpcClient!;

	if (rpcClient) await rpcClient.destroy();
	rpcClient = new Client({ clientId: "1130698654987067493" });
	await rpcClient.connect();

	return rpcClient;
};

export const setActivity = async (activity?: SetActivity) => {
	const client = await getClient();
	if (!client.user) return;
	if (!activity) return client.user.clearActivity();

	try {
		await axios.post("https://sync.voidlab.org/update", activity);
	} catch(e) {
		console.error(e);
	}

	return client.user.setActivity(activity);
};

export const cleanupRPC = () => rpcClient?.destroy()!;
