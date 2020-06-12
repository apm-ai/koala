/*
Copyright © 2020 NAME HERE <EMAIL ADDRESS>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package cmd

import (
	"database/sql"

	"github.com/apm-ai/DataV/backend/cmd/sqls"
	"github.com/apm-ai/DataV/backend/pkg/config"
	"github.com/apm-ai/DataV/backend/pkg/db"
	"github.com/apm-ai/DataV/backend/pkg/log"
	"github.com/spf13/cobra"
	"go.uber.org/zap"
)

// initCmd represents the init command
var initCmd = &cobra.Command{
	Use:   "init",
	Short: "init the enviroments that datav needs to run",
	Long:  ``,
	Run: func(cmd *cobra.Command, args []string) {
		config.Init("web.conf")
		log.InitLogger(config.Data.Common.LogLevel)

		createTables()

		log.Out.Info("init enviroments ok, you can start datav now")
	},
}

func init() {
	rootCmd.AddCommand(initCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// initCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// initCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}

func createTables() {
	d, err := sql.Open("sqlite3", "./datav.db")
	if err != nil {
		log.Out.Fatal("open sqlite error", zap.Error(err))
	}
	db.SQL = d

	// create tables
	for _, q := range sqls.CreateTableSqls {
		_, err = d.Exec(q)
		if err != nil {
			log.Out.Fatal("sqlite create table error", zap.Error(err), zap.String("sql", q))
		}
	}

	log.Out.Info("create tables ok")
}
