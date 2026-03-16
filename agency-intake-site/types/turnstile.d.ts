interface TurnstileRenderOptions {
  sitekey?: string;
  callback?: (token: string) => void;
}

interface TurnstileApi {
  render: (container: string | HTMLElement, options: TurnstileRenderOptions) => string;
}

interface Window {
  turnstile?: TurnstileApi;
}
