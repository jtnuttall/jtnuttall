{
  description = "Jeremy's portfolio entrypoint";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    jail-nix.url = "sourcehut:~alexdavid/jail.nix";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    jail-nix,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      tooling-overlay = final: prev: {
        jtnuttall-node = prev.nodejs_24;
        jtnuttall-pnpm = prev.pnpm_10;
      };

      jail-overlay = final: prev:
        jail-nix.lib.mkOverlay {
          inherit final prev;
          packages = combinators:
            with combinators; {
              claude-code = [
                (persist-home "claude")
                mount-cwd
                network
                notifications
                no-new-session
                (try-fwd-env "TERM")
                (try-fwd-env "COLORTERM")
                (add-pkg-deps [
                  final.bash
                  final.git
                  final.ripgrep
                  final.gnugrep
                  final.gnused
                  final.findutils
                  final.which
                  final.curl
                  final.less
                  final.fd
                  final.just
                  final.jq
                  final.diffutils
                  final.gnutar
                  final.gzip
                  final.jtnuttall-node
                  final.jtnuttall-pnpm
                ])
              ];
            };
        };

      pkgs = import nixpkgs {
        inherit system;
        overlays = [tooling-overlay jail-overlay];
        config.allowUnfreePredicate = pkg:
          builtins.elem (nixpkgs.lib.getName pkg) [
            "claude-code"
          ];
      };
    in {
      formatter = pkgs.alejandra;

      devShells.default = pkgs.mkShell {
        packages = with pkgs; [
          just
          just-lsp
          texliveFull
          zathura
          claude-code
          jtnuttall-node
          jtnuttall-pnpm
        ];
      };
    });
}
