import handleException from "@root/util/handleException";

type JoinPartyResponseContract = {
  href: string;
} | ReturnType<typeof handleException>

export default JoinPartyResponseContract