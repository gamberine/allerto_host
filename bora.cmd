@echo off
SETLOCAL

REM ------------------------------------------------------------
REM Script de atalho para acelerar os comandos do projeto Allerto
REM Uso:
REM   bora        -> npm run preview
REM   bora d      -> npm run dev
REM
REM Outras opcoes uteis (comentadas):
REM   bora build  -> npm run build
REM   bora test   -> npm test
REM   bora lint   -> npm run lint
REM ------------------------------------------------------------

IF "%~1"=="" (
  ECHO Executando: npm run preview
  CALL npm run preview
  EXIT /B %ERRORLEVEL%
)

IF /I "%~1"=="d" (
  ECHO Executando: npm run dev
  CALL npm run dev
  EXIT /B %ERRORLEVEL%
)

ECHO Opcao "%~1" nao reconhecida. Utilize "bora" ou "bora d".
EXIT /B 1

