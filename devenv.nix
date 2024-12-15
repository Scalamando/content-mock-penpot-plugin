{
  pkgs,
  inputs,
  ...
}: let
  nodejs-pkgs = import inputs.nix-nodejs {inherit (pkgs) system;};
in {
  languages.javascript = {
    enable = true;
    corepack.enable = true;
    package = nodejs-pkgs.nodejs;
  };
}
