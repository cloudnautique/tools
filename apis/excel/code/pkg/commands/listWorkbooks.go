package commands

import (
	"context"
	"fmt"

	"github.com/gptscript-ai/tools/apis/excel/code/pkg/client"
	"github.com/gptscript-ai/tools/apis/excel/code/pkg/global"
	"github.com/gptscript-ai/tools/apis/excel/code/pkg/graph"
	"github.com/gptscript-ai/tools/apis/excel/code/pkg/printers"
)

func ListWorkbooks(ctx context.Context) error {
	c, err := client.NewClient(global.ReadOnlyScopes)
	if err != nil {
		return err
	}

	workbookInfos, err := graph.ListWorkbooks(ctx, c)
	if err != nil {
		return fmt.Errorf("failed to list spreadsheets: %w", err)
	}

	printers.PrintWorkbookInfos(workbookInfos)
	return nil
}