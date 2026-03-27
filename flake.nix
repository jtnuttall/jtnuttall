{
  description = "Jeremy's portfolio entrypoint";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShells.default = pkgs.mkShell {
        buildInputs = builtins.attrValues {
          inherit (pkgs) just just-lsp nodejs_24 pnpm_10 zathura texliveFull;
        };
      };
    });
}
