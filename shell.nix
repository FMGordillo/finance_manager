let
  pkgs = import <nixpkgs> {};
in
pkgs.mkShell {
  nativeBuildInputs = with pkgs; [
    nodePackages.pnpm
    nodejs_18
  ];
}
