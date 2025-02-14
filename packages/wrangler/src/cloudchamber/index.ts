import { handleFailure } from "./common";
import { createCommand, createCommandOptionalYargs } from "./create";
import { deleteCommand, deleteCommandOptionalYargs } from "./delete";
import { registriesCommand } from "./images/images";
import { listCommand, listDeploymentsYargs } from "./list";
import { modifyCommand, modifyCommandOptionalYargs } from "./modify";
import { sshCommand } from "./ssh/ssh";
import type { CommonYargsArgvJSON, CommonYargsOptions } from "../yargs-types";
import type { CommandModule } from "yargs";

export const cloudchamber = (
	yargs: CommonYargsArgvJSON,
	subHelp: CommandModule<CommonYargsOptions, CommonYargsOptions>
) => {
	return yargs
		.command(
			"delete [deploymentId]",
			"Delete an existing deployment that is running in the Cloudflare edge",
			(args) => deleteCommandOptionalYargs(args),
			(args) => handleFailure(deleteCommand)(args)
		)
		.command(
			"create",
			"Create a new deployment",
			(args) => createCommandOptionalYargs(args),
			(args) => handleFailure(createCommand)(args)
		)
		.command(
			"list [deploymentIdPrefix]",
			"List and view status of deployments",
			(args) => listDeploymentsYargs(args),
			(args) => handleFailure(listCommand)(args)
		)
		.command(
			"modify [deploymentId]",
			"Modify an existing deployment",
			(args) => modifyCommandOptionalYargs(args),
			(args) => handleFailure(modifyCommand)(args)
		)
		.command("ssh", "Manage the ssh keys of your account", (args) =>
			sshCommand(args).command(subHelp)
		)
		.command("registries", "Configure registries via Cloudchamber", (args) =>
			registriesCommand(args).command(subHelp)
		);
};
