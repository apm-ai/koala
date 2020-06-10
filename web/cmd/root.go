// Copyright © 2019 NAME HERE <EMAIL ADDRESS>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package cmd

import (
	"os"
	"os/signal"
	"syscall"

	"github.com/apm-ai/DataV/web/config"
	"github.com/apm-ai/DataV/web/internal/service"
	"github.com/imdevlab/g"
	"github.com/spf13/cobra"

	"go.uber.org/zap"
)

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "web",
	Short: "A brief description of your application",
	Long: `A longer description that spans multiple lines and likely contains
examples and usage of using your application. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	Run: func(cmd *cobra.Command, args []string) {
		config.Init("web.conf")
		g.InitLogger(config.Data.Common.LogLevel)

		s := service.New()
		s.Start()
		// 等待服务器停止信号
		chSig := make(chan os.Signal)
		signal.Notify(chSig, syscall.SIGINT, syscall.SIGTERM)
		sig := <-chSig
		g.L.Info("tracing received signal", zap.Any("signal", sig))
		s.Close()
	},
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}

func init() {
	// Cobra also supports local flags, which will only run
	// when this action is called directly.
	rootCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}