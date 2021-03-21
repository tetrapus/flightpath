declare global {
  interface Document {
    corsBypass: any;
    phabricatorApiKey: string;
    phabricatorURL: string;
  }
}

type QueryEndpoint<T> = {
  result: { [phid: string]: T };
};

type SearchEndpoint<T> = {
  result: { data: T[] };
};

export interface User {
  phid: "string";
  image: "string";
}

export type PhabricatorEndpoint = {
  "user.query": QueryEndpoint<User>;
  "maniphest.search": SearchEndpoint<{ phid: string }>;
  "maniphest.query": QueryEndpoint<{
    title: string;
    phid: string;
    ownerPHID?: string;
    dependsOnTaskPHIDs?: string[];
    isClosed: boolean;
  }>;
};

export function phabricator<T extends keyof PhabricatorEndpoint>(
  endpoint: T,
  data: any
): Promise<PhabricatorEndpoint[T]> {
  const params = {
    "api.token": document.phabricatorApiKey,
    ...objToParams(data),
  };
  return new Promise((resolve) => {
    document?.corsBypass({
      method: "POST",
      url: `https://${document.phabricatorURL}/api/${endpoint}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      anonymous: true,
      data: Object.entries(params)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&"),
      onload: (xhr: any) => {
        console.log(xhr.responseText);
        resolve(JSON.parse(xhr.responseText));
      },
    });
  });
}

function objToParams(obj: any, path: string = ""): { [key: string]: string } {
  if (typeof obj === "object") {
    return Object.assign(
      {},
      ...Object.entries(obj)
        .map(([key, value]) =>
          objToParams(value, path ? `${path}[${key}]` : key)
        )
        .flat()
    );
  } else {
    return { [path]: obj };
  }
}
