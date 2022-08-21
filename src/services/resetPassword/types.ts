export type ResetEmailResponse = {
  success: string | null | undefined;
  token: string | null | undefined;
  uidb64: string | null | undefined;
};

export type ResetPasswordRequest = {
  password: string | null | undefined;
  token: string | null | undefined;
  uidb64: string | null | undefined;
};
